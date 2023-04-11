from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField

from decimal import Decimal
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **kwargs):
        
        if not email:
            raise ValueError("Email is required")

        if not username:
            raise ValueError("Username is required")

        user = self.model(
            email=self.normalize_email(email),
            username = username,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password, **kwargs):
        user = self.create_user(
            email=self.normalize_email(email),
            username = username,
            password = password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser= True
        user.save(using=self._db)
        return 


class Account(AbstractBaseUser):
    email = models.EmailField(null=False, blank=False, unique=True)
    username = models.CharField(max_length=50, blank=False, null=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
         return True

    def has_module_perms(self, app_label):
        return True

# Create your models here.
class Products(models.Model):
    productName = models.CharField(max_length=50, default='Product name')
    companyName = models.CharField(max_length=50, default = 'Company name')
    year = models.PositiveSmallIntegerField(default=0)
    refurbished = models.BooleanField(default=False)
    color = models.CharField(max_length=50, default='Color')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    stock = models.PositiveIntegerField(default=0,)
    size = models.CharField(max_length=50, default='Size')
    screen = models.CharField(max_length=50, default='Screen')
    rating = models.PositiveSmallIntegerField(default=0,)
    description = models.TextField(default='Product description.')
    img = models.TextField(default='')
   
    def __str__(self):
        return self.productName
    
    class Meta:
        db_table = 'products'


# class Orders(models.Model):
#     date = models.DateTimeField(auto_now_add=True)
#     products = ArrayField(models.CharField(max_length=50), default=list)
#     quantities = ArrayField(models.PositiveIntegerField(), default=list)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
#     delivery_method = models.CharField(max_length=30, default='')
#     payment_method = models.CharField(max_length=30, default='')
#     owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders', on_delete=models.CASCADE)

#     class Meta:
#         db_table = 'orders'

class Carts(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='carts', on_delete=models.CASCADE)
    products = models.ManyToManyField(Products)
  
    
    def __str__(self):
        return self.owner.username
    
  
   
      

      
   
        



