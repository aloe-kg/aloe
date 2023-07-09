from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    pass


class ProductAdmin(admin.ModelAdmin):
    list_filter = ["category"]
    list_display = ["title", "price", "category"]
    search_fields = ["title", "description"]


class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "parent", "is_active"]
    search_fields = ["name", "description"]

    def save_model(self, request, obj, form, change):
        if "is_active" in form.changed_data:
            for i in obj.children.all():
                i.is_active = obj.is_active
                i.save()
        super().save_model(request, obj, form, change)


admin.site.register(User, UserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer)
admin.site.register(Brand)
admin.site.register(Order)
