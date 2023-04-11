from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.conf import settings

from rest_framework import viewsets, permissions
from .models import Products, Carts
from .serializers import ProductsSerializer, CartsSerializer
# from .serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly
from .permissions import IsStaffOrTargetUser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from django.middleware import csrf
from django.contrib.auth import authenticate
from cart import serializers, models


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
        rest_permissions.IsAuthenticatedOrReadOnly,
        
    )
  
    
    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(owner=user)
        return queryset
      
    
    @action(methods=['delete'], detail=False)
    def delete_cart(self, request):
        data = request.data
        cart = Carts.objects.get(owner=request.user)
        cart.delete()
        return Response(status=status.HTTP_200_OK)
    @action(methods=['post'], detail=False)
    def create_cart(self, request):
        data = request.data
        Carts.objects.get_or_create(owner=request.user)
        
        
        return Response(status=status.HTTP_200_OK)
      
    @action(methods=['post'], detail=False)
    def add_product(self, request):
        data = request.data
        product_id = data['productName']
        product = Products.objects.get(productName=product_id)
        cart = Carts.objects.get(owner=request.user)
        cart.products.add(product)
        cart.save()
        return Response(status=status.HTTP_200_OK)
    @action(methods=['post'], detail=False)
    def remove_product(self, request):
        data = request.data
        product_id = data['productName']
        product = Products.objects.get(productName=product_id)
        cart = Carts.objects.get(owner=request.user)
        cart.products.remove(product)
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


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def get_permissions(self):
#         # allow non-authenticated  to create via POST
#         return (permissions.AllowAny() if self.request.method == 'POST' else IsStaffOrTargetUser()),

#     def perform_create(self, serializer):
#         password = make_password(self.request.data['password'])
#         serializer.save(password=password)

#     def perform_update(self, serializer):
#         password = make_password(self.request.data['password'])
#         serializer.save(password=password)
        
        
def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_token)
    }


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    user = authenticate(email=email, password=password)

    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=tokens["refresh_token"],
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.data = tokens
        res["X-CSRFToken"] = csrf.get_token(request)
        return res
    raise rest_exceptions.AuthenticationFailed(
        "Email or Password is incorrect!")


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    if user is not None:
        return response.Response("Registered!")
    return rest_exceptions.AuthenticationFailed("Invalid credentials!")


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    try:
        refreshToken = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        res["X-CSRFToken"]=None
        
        return res
    except:
        raise rest_exceptions.ParseError("Invalid token")


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user = models.Account.objects.get(id=request.user.id)
    except models.Account.DoesNotExist:
        return response.Response(status_code=404)

    serializer = serializers.AccountSerializer(user)
    return response.Response(serializer.data)
