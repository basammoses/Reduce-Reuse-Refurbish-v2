from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework import viewsets, permissions
from .models import Products, Carts
from .serializers import ProductsSerializer, CartsSerializer
from .serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly
from .permissions import IsStaffOrTargetUser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

import json
import logging

# Create your views here.
class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all().order_by('-productName')
    serializer_class = ProductsSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    )
    

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Carts.objects.all().order_by('-id')
    serializer_class = CartsSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    )

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(owner=user)
        return queryset

    @action(methods=['post'], detail=False)
    def add_product(self, request):
        data = request.data
        product_id = data['productName']
        product = Products.objects.get(productName=product_id)
        cart = Carts.objects.get(owner=request.user)
        cart.products.add(product)
        cart.save()
        return Response(status=status.HTTP_200_OK)
    



# class OrdersViewSet(viewsets.ModelViewSet):
#     queryset = Orders.objects.all().order_by('-id')
#     serializer_class = OrdersSerializer
#     permission_classes = (
#         permissions.IsAuthenticatedOrReadOnly,
#         IsOwnerOrReadOnly
#     )

#     def get_queryset(self):
#         user = self.request.user
#         queryset = self.queryset.filter(owner=user)
#         return queryset

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # allow non-authenticated  to create via POST
        return (permissions.AllowAny() if self.request.method == 'POST' else IsStaffOrTargetUser()),

    def perform_create(self, serializer):
        password = make_password(self.request.data['password'])
        serializer.save(password=password)

    def perform_update(self, serializer):
        password = make_password(self.request.data['password'])
        serializer.save(password=password)
