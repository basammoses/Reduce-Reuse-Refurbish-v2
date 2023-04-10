"""nyc_subway URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from cart import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .api_router import CustomObtainAuthTokenView, UserViewSet, MessageViewSet, ConversationViewSet
from django.views.generic import TemplateView





routers = routers.DefaultRouter()
routers.register(r"products", views.ProductsViewSet, "products")
routers.register(r"cart", views.CartViewSet, "cart")
routers.register(r"users", UserViewSet, "users")
routers.register(r"conversations", ConversationViewSet, basename="conversations")
routers.register(r"messages", MessageViewSet, basename="messages")



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(routers.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path ('api-token-auth/', TokenObtainPairView.as_view()),
    path ('api-token-refresh/', TokenRefreshView.as_view()),
    path ('api-token-verify/', TokenVerifyView.as_view()),
     path('token/', CustomObtainAuthTokenView.as_view(), name='token_obtain_pair'),
    # path('users/<str:username>/', user_detail_view, name='user_detail'),
    # path('users/<str:username>/update/', user_update_view, name='user_update'),
]
