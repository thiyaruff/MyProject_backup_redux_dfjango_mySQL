from rest_framework import serializers
from .models import Category, Products,Profile


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    class Meta:
        model = Products
        fields = '__all__'
    # def create(self, validated_data):
    #     category = self.context['category']
    #     print(category)
    #     return Products.objects.create(**validated_data,category=category)

# class CartSerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True)
    # class Meta:
    #     model = Cart
    #     fields = ('id', 'products', 'amount')
    # def create(self, validated_data):
    #     products = self.context['products']
    #     print(products)
    #     return Cart.objects.create(**validated_data,products=products)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model =Profile
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Profile.objects.create(**validated_data,user=user)
    
