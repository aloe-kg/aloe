from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned, ValidationError
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.db.models import Count, Q, F
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from drf_spectacular.utils import extend_schema, extend_schema_view
from smtplib import SMTPException

from .models import *
from .serializers import *


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.exclude(is_active=False).prefetch_related('products__brand')
    serializer_class = CategorySerializer


class CategoryProductsList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        try:
            category = Category.objects.get(url_path=kwargs.get('category_path', ''))
            if category.parent != category:
                raise MultipleObjectsReturned
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return Response({"message": "Invalid category"}, status=400)
        paginator = self.pagination_class()
        products = category.all_products
        response = self.serializer_class(
            paginator.paginate_queryset(products, request),
            many=True,
            context={"request": request}
        ).data
        return paginator.get_paginated_response(response)


class CategoryBrandsList(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    def list(self, request, *args, **kwargs):
        try:
            category = Category.objects.get(url_path=kwargs.get('category_path', ''))
            if category.parent != category:
                raise MultipleObjectsReturned
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return Response({"message": "Invalid category"}, status=400)
        brands = category.brands
        response = self.serializer_class(brands, many=True, context={"request": request}).data
        return Response({"brands": response})


class CategoryProductsListByBrands(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    @extend_schema(parameters=[LimitOffsetSerializer], request=BrandSerializer(many=True), responses={
        400: MessageSerializer,
        200: ProductSerializer(many=True)
    })
    def post(self, request, category_path):
        try:
            category = Category.objects.get(url_path=category_path)
            if category.parent != category:
                raise MultipleObjectsReturned
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return Response({"message": "Invalid category"}, status=400)
        brands = []
        try:
            for i in request.data:
                brands.append(Brand.objects.get(name=i["name"]))
        except ObjectDoesNotExist:
            return Response({"message": "Invalid brand name"}, status=400)
        paginator = self.pagination_class()
        products = list(category.products.filter(brand__in=brands))
        for subcategory in category.children.all().prefetch_related('products'):
            products += list(subcategory.products.filter(brand__in=brands))
        response = self.serializer_class(
            paginator.paginate_queryset(products, request),
            many=True,
            context={"request": request}
        ).data
        return paginator.get_paginated_response(response)


class SubcategoryProductsList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        try:
            parent_category = Category.objects.get(
                Q(url_path=self.kwargs.get('parent_category_path', '')) & Q(parent__id=F('id'))
            )
            category = Category.objects.get(url_path=self.kwargs.get('category_path', ''), parent=parent_category)
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return Response({"message": "Invalid category"}, status=400)
        paginator = self.pagination_class()
        response = self.serializer_class(
            paginator.paginate_queryset(category.products.all(), request),
            many=True,
            context={"request": request}
        ).data
        return paginator.get_paginated_response(response)


class SubcategoryBrandsList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = BrandSerializer

    def list(self, request, *args, **kwargs):
        try:
            parent_category = Category.objects.get(
                Q(url_path=self.kwargs.get('parent_category_path', '')) & Q(parent__id=F('id'))
            )
            category = Category.objects.get(url_path=self.kwargs.get('category_path', ''), parent=parent_category)
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return Response({"message": "Invalid category"}, status=400)
        brands = category.brands
        response = self.serializer_class(brands, many=True, context={"request": request}).data
        return Response({"brands": response})


class SubcategoryProductsListByBrands(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    @extend_schema(parameters=[LimitOffsetSerializer], request=BrandSerializer(many=True), responses={
        400: MessageSerializer,
        200: ProductSerializer(many=True)
    })
    def post(self, request, parent_category_path, category_path):
        try:
            parent_category = Category.objects.get(
                Q(url_path=parent_category_path) & Q(parent__id=F('id'))
            )
            category = Category.objects.get(url_path=category_path, parent=parent_category)
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return Response({"message": "Invalid category"}, status=400)
        brands = []
        try:
            for i in request.data:
                brands.append(Brand.objects.get(name=i["name"]))
        except ObjectDoesNotExist:
            return Response({"message": "Invalid brand name"}, status=400)
        paginator = self.pagination_class()
        response = self.serializer_class(
            paginator.paginate_queryset(category.products.filter(brand__in=brands), request),
            many=True,
            context={"request": request}
        ).data
        return paginator.get_paginated_response(response)


class CategoriesProductsList(APIView):
    queryset = Category.objects.all()
    serializer_class = CategoriesWithProductsSerializer

    @extend_schema(request=IdSerializer(many=True), responses={
        400: MessageSerializer,
        200: CategoriesWithProductsSerializer
    })
    def post(self, request):
        categories = []
        try:
            for i in request.data:
                categories.append(Category.objects.get(pk=i["id"]))
        except ObjectDoesNotExist:
            return Response({"message": "No category with given id"}, status=400)
        return Response(self.serializer_class(categories, many=True, context={"request": request}).data)


@extend_schema_view(
    get=extend_schema(parameters=[SortSerializer])
)
class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        sort_by = self.request.query_params.get('sort_by', '')
        is_ascending = self.request.query_params.get('is_ascending', 'true')
        if is_ascending == 'false':
            sort_by = f'-{sort_by}'
        if sort_by:
            if sort_by == 'popularity':
                return Product.objects.all().annotate(popularity=Count('customers')).order_by(sort_by)
            else:
                return Product.objects.order_by(sort_by)
        else:
            return Product.objects.all()


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductsByIdsList(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @extend_schema(request=IdSerializer(many=True), responses={
        400: MessageSerializer,
        200: ProductSerializer(many=True)
    })
    def post(self, request):
        products = []
        try:
            for i in request.data:
                products.append(Product.objects.get(pk=i["id"]))
        except ObjectDoesNotExist:
            return Response({"message": "No products found with given id"}, status=400)
        return Response(self.serializer_class(products, many=True, context={"request": request}).data)


class NewProductsList(generics.ListAPIView):
    queryset = Product.objects.order_by('-created_at', 'id')
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination


class PopularProductsList(generics.ListAPIView):
    queryset = Product.objects.all().annotate(popularity=Count('customers')).order_by('-popularity', 'id')
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination


@extend_schema_view(
    get=extend_schema(parameters=[QuerySerializer])
)
class ProductSearch(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        if query:
            paginator = self.pagination_class()
            response = self.serializer_class(
                paginator.paginate_queryset(Product.objects.filter(title__icontains=query), request),
                many=True,
                context={"request": request}
            ).data
            return paginator.get_paginated_response(response)
        else:
            return Response({'message': "Empty query is not allowed"}, status=400)


@extend_schema_view(
    get=extend_schema(parameters=[BrandSerializer])
)
class BrandProductsList(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        try:
            brand = Brand.objects.get(name=request.query_params.get('name', ''))
        except ObjectDoesNotExist:
            return Response({"message": "Invalid brand"}, status=400)
        paginator = self.pagination_class()
        response = self.serializer_class(
            paginator.paginate_queryset(Product.objects.filter(brand=brand), request),
            many=True,
            context={"request": request}
        ).data
        return paginator.get_paginated_response(response)


class UserRegistration(APIView):
    serializer_class = CustomerSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        customer = serializer.save()
        token = Token.objects.create(user=customer.user)
        return Response({
            'token': token.key,
            'user': UserSerializer(customer.user).data
        })


class UserAuth(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })


class ResetPassword(APIView):
    @extend_schema(request=EmailSerializer, responses={
        200: MessageSerializer,
        400: MessageSerializer,
        500: MessageSerializer,
    })
    def post(self, request):
        email = request.data.get('email', '')
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return Response({'message': f'User not found with email {email}'}, status=400)
        new_password = User.objects.make_random_password()
        user.set_password(new_password)
        user.save()
        message = render_to_string('reset_password.html', {'user': user, 'password': new_password})
        email = EmailMessage(
            "Сброс пароля от вашего аккаунта на Aloe",
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        email.content_subtype = 'html'
        try:
            email.send()
        except SMTPException:
            return Response({'message': 'The email was not sent due to technical problems on the server'}, status=500)
        return Response({'message': 'New password was sent successfully to user\'s email'})


class UpdatePassword(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=NewPasswordSerializer, responses={
        400: MessageSerializer,
        403: MessageSerializer,
        200: MessageSerializer
    })
    def post(self, request):
        password = request.data.get('password', '').strip()
        repeated_password = request.data.get('repeated_password', '').strip()
        if password != repeated_password:
            return Response({'message': 'Entered passwords do not match'}, status=400)
        if not request.user.check_password(password):
            return Response({'message': 'Incorrect password'}, status=403)
        new_password = request.data.get('new_password', '')
        try:
            validate_password(new_password, request.user)
        except ValidationError as error:
            return Response({'message': error.messages})
        request.user.set_password(new_password)
        request.user.save()
        return Response({'message': 'Password was successfully updated'})


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class AddProductToFavorites(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=IdSerializer, responses={200: MessageSerializer, 400: MessageSerializer})
    def post(self, request):
        customer = request.user.customer
        try:
            customer.favorites.add(Product.objects.get(pk=request.data.get("id", 0)))
        except ObjectDoesNotExist:
            return Response({'message': 'Invalid ID for product'}, status=400)
        return Response({'message': 'Product was successfully added to favorites'}, status=200)


class RemoveProductFromFavorites(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=IdSerializer, responses={200: MessageSerializer, 400: MessageSerializer})
    def post(self, request):
        customer = request.user.customer
        try:
            customer.favorites.remove(Product.objects.get(pk=request.data.get("id", 0)))
        except ObjectDoesNotExist:
            return Response({'message': 'Invalid ID for product'}, status=400)
        return Response({'message': 'Product was successfully removed from favorites'}, status=200)


class FavoriteProductsList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.customer.favorites.all()


class UpdateCartProducts(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=CartSerializer(many=True), responses={200: MessageSerializer, 400: MessageSerializer})
    def post(self, request):
        customer = request.user.customer
        try:
            for i in request.data:
                product = Product.objects.get(pk=i.get("product", 0))
                quantity = i.get("quantity", 1)
                cart = Cart.objects.filter(customer=customer, product=product)
                if cart:
                    if quantity:
                        cart[0].quantity = quantity
                        cart[0].save()
                    else:
                        cart[0].delete()
                else:
                    customer.cart_products.add(product, through_defaults={'quantity': quantity})
        except ObjectDoesNotExist:
            return Response({'message': 'Invalid ID for product'}, status=400)
        return Response({'message': 'Products were successfully updated in the cart'}, status=200)


class ClearCart(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(responses={200: MessageSerializer})
    def post(self, request):
        customer = request.user.customer
        customer.cart_products.clear()
        return Response({'message': 'Cart was successfully cleared'}, status=200)


class CartList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return Cart.objects.filter(customer=self.request.user.customer)


class CartOrder(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(responses={200: MessageSerializer})
    def post(self, request):
        customer = request.user.customer
        order = Order.objects.create(customer=customer)
        order.products.set(customer.cart_products.all())
        customer.cart_products.clear()
        return Response({'message': 'Order was successfully created'}, status=200)
