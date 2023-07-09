from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import *


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, null=False, blank=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Category(models.Model):
    image = models.ImageField(null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    name = models.CharField(max_length=255)
    order = models.IntegerField()
    description = models.TextField(max_length=1500, null=True, blank=True)
    url_path = models.CharField(max_length=200, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return f'{self.name}'

    @property
    def all_products(self):
        products = list(self.products.all())
        for subcategory in self.children.all().prefetch_related('products'):
            products += list(subcategory.products.all())
        return products

    @property
    def brands(self):
        result = set()
        for product in self.products.all():
            result.add(product.brand)
        for subcategory in self.children.all().prefetch_related('products__brand'):
            for product in subcategory.products.all():
                result.add(product.brand)
        result.discard(None)
        return result

    def parent_id(self):
        return self.parent.id


class Product(models.Model):
    price = models.DecimalField(decimal_places=4, max_digits=10, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, max_length=1000, upload_to="product_images/")
    title = models.CharField(max_length=1000)
    description = models.TextField(max_length=10000)
    meta_title = models.CharField(max_length=1000)
    meta_description = models.TextField(max_length=1000)
    meta_keyword = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='products')
    created_at = models.DateField(auto_now_add=True, null=True, blank=True)
    brand = models.ForeignKey('Brand', on_delete=models.DO_NOTHING, null=True, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.title}'

    @property
    def root_category_id(self):
        return self.category.parent.id

    @property
    def brand_name(self):
        return self.brand.name if self.brand else ""


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Product, related_name="customers")
    cart_products = models.ManyToManyField(Product, through="Cart")

    def __str__(self):
        return f'{self.user}'


class Brand(models.Model):
    name = models.CharField(max_length=511)

    def __str__(self):
        return f'{self.name}'


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    products = models.ManyToManyField(Product, related_name='orders')
    creation_time = models.DateTimeField(auto_now=True)
    delivered = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.customer} {self.creation_time}'


class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
