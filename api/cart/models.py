from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField

from decimal import Decimal

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
    
  
   
      

      
   
        

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.CharField(max_length=50, default='')
    city = models.CharField(max_length=50, default='')
    state = models.CharField(max_length=50, default='')
    zip_code = models.CharField(max_length=50, default='')
    country = models.CharField(max_length=50, default='')
    
    def __str__(self):
        return self.user.username

    class Meta:
        db_table = 'profile'

