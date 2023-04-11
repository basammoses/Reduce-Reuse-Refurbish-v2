from django.contrib import admin

from .models import Products, Carts,Account
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib.auth import get_user_model

user = get_user_model()

class ProductsResource(resources.ModelResource):
    class Meta:
        model = Products
      
        
        
class ProductsAdmin(ImportExportModelAdmin):
    resource_class = ProductsResource
    list_display = ('productName', 'companyName', 'year', 'refurbished', 'color', 'price', 'size', 'screen', 'stock', 'img', )
    list_filter = ('productName', 'companyName', 'year', 'refurbished', 'color', 'price', 'size', 'screen', 'stock', 'img', )
    search_fields = ('productName', 'companyName', 'year', 'refurbished', 'color', 'price', 'size', 'screen', 'stock', 'img',)


# class OrdersResource(resources.ModelResource):
#     class Meta:
#         model = Orders


# class OrdersAdmin(ImportExportModelAdmin):
#     resource_class = OrdersResource
#     list_display = ('date', 'products', 'quantities', 'total_price', 'delivery_method', 'payment_method')
#     list_filter = ('date', 'products', 'quantities', 'total_price', 'delivery_method', 'payment_method')
#     search_fields = ('date', 'products', 'quantities', 'total_price', 'delivery_method', 'payment_method')


class CartsResource(resources.ModelResource):
    class Meta:
        model = Carts





admin.site.register(Account)
admin.site.register(Products, ProductsAdmin)
# admin.site.register(Orders, OrdersAdmin)
admin.site.register(Carts)
