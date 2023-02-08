from django.contrib import admin

from .models import Products, Profile,Category


admin.site.register(Products)
# admin.site.register(Cart)
admin.site.register(Profile)
admin.site.register(Category)

