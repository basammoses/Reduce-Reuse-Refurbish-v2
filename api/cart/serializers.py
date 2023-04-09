from django.contrib.auth.models import User

from rest_framework import serializers
from .models import Products, Carts, Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProductsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Products
        fields = 'productName', 'companyName', 'year', 'refurbished', 'color', 'price', 'size', 'screen', 'stock', 'img', 'owner'


# class OrdersSerializer(serializers.ModelSerializer):
#     owner = serializers.ReadOnlyField(source='owner.username')

#     class Meta:
#         model = Orders
#         fields = '__all__'


class CartsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    products = ProductsSerializer(many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Carts
        fields = '__all__'
    
    def get_total_price(self,obj):
        total_price = 0
        for product in obj.products.all():
            total_price += product.price
        return total_price
   


class UserSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    profile = ProfileSerializer()
   

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password','profile', 'products')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
