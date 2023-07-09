from django.urls import path

from .views import *


urlpatterns = [
    path('categories/', CategoryList.as_view()),
    path('categories/<slug:category_path>/brands/', CategoryBrandsList.as_view()),
    path('categories/<slug:category_path>/by_brands/', CategoryProductsListByBrands.as_view()),
    path('categories/<slug:category_path>/', CategoryProductsList.as_view()),
    path('categories/<slug:parent_category_path>/<slug:category_path>/brands/', SubcategoryBrandsList.as_view()),
    path(
        'categories/<slug:parent_category_path>/<slug:category_path>/by_brands/',
        SubcategoryProductsListByBrands.as_view()
    ),
    path('categories/<slug:parent_category_path>/<slug:category_path>/', SubcategoryProductsList.as_view()),
    path('categories/products', CategoriesProductsList.as_view()),

    path('products/', ProductList.as_view()),
    path('products/<int:pk>/', ProductDetail.as_view()),
    path('products/ids/', ProductsByIdsList.as_view()),
    path('products/new/', NewProductsList.as_view()),
    path('products/popular/', PopularProductsList.as_view()),
    path('products/search/', ProductSearch.as_view()),
    path('products/by_brand/', BrandProductsList.as_view()),

    path('favorites/add/', AddProductToFavorites.as_view()),
    path('favorites/remove/', RemoveProductFromFavorites.as_view()),
    path('favorites/', FavoriteProductsList.as_view()),

    path('cart/', CartList.as_view()),
    path('cart/update/', UpdateCartProducts.as_view()),
    path('cart/clear/', ClearCart.as_view()),
    path('cart/order/', CartOrder.as_view()),

    path('register/', UserRegistration.as_view()),

    path('auth/', UserAuth.as_view()),

    path('profile/reset_password/', ResetPassword.as_view()),
    path('profile/update_password/', UpdatePassword.as_view()),
    path('profile/me/', UserDetail.as_view()),
]
