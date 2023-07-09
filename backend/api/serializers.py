from rest_framework import serializers
import random

from .models import *


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        exclude = ['id']


class CategorySerializer(serializers.ModelSerializer):
    brands = BrandSerializer(many=True, read_only=True)
    parent = serializers.IntegerField(source="parent_id")

    class Meta:
        model = Category
        exclude = ['is_active']
        depth = 1


class ProductSerializer(serializers.ModelSerializer):
    root_category = serializers.IntegerField(source='root_category_id')
    brand_name = serializers.CharField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude = ['brand']

    def get_image(self, product):
        request = self.context.get('request')
        image_url = product.image.url
        return request.build_absolute_uri(image_url)


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['product', 'quantity']


class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class CategoriesWithProductsSerializer(serializers.ModelSerializer):
    ten_products = ProductSerializer(many=True, read_only=True, source='all_products')

    class Meta:
        model = Category
        fields = ['url_path', 'name', 'ten_products']
        depth = 1

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        random.shuffle(representation["ten_products"])
        representation["ten_products"] = representation["ten_products"][:10]
        return representation


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ["user"]

    def create(self, validated_data):
        user = UserSerializer(data=validated_data["user"])
        user.is_valid(raise_exception=True)
        user = user.save()
        customer = Customer(user=user)
        customer.save()
        return customer


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=255)


class QuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=1000)


class SortSerializer(serializers.Serializer):
    sort_by = serializers.ChoiceField([
        ('title', 'Title'),
        ('price', 'Price'),
        ('created_at', 'Date'),
        ('popularity', 'Popularity'),
    ], required=False)
    is_ascending = serializers.BooleanField(default=True, required=False)


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class NewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255)
    repeated_password = serializers.CharField(max_length=255)
    new_password = serializers.CharField(max_length=255)


class LimitOffsetSerializer(serializers.Serializer):
    limit = serializers.IntegerField(required=False)
    offset = serializers.IntegerField(required=False)
