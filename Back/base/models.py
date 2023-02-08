from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)

class Products(models.Model):
    desc = models.CharField(max_length=50,null=True,blank=True)
    price = models.DecimalField(max_digits=5,decimal_places=2)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
 
    def __str__(self):
           return self.desc

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=500, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    birth_date = models.DateField(null=True, blank=True)

# class Cart(models.Model):
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    # products = models.ManyToManyField(Products)
    # amount = models.PositiveIntegerField()
    
    