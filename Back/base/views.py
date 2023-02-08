
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import  Category, Products, Profile
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializer import  CategorySerializer, ProductSerializer, ProfileSerializer
from rest_framework.response import Response
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        # ...
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response("new user born")

# //////////////END OF LOGIN///////////

def index(req):
    return JsonResponse('hello', safe=False)

# /////// crud admin products with serializer

class APIViews(APIView):
    parser_class=(MultiPartParser,FormParser)
    def post(self,request,*args,**kwargs):
        api_serializer=ProductSerializer(data=request.data)
        print( api_serializer)
        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data,status=status.HTTP_201_CREATED)
        else:
            print('error',api_serializer.errors)
            return Response(api_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    def get(self, request,  format=None):
        my_model = Products.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)
    def delete(self, request, id, format=None):
        try:
            my_data =Products.objects.get(id=id)
            my_data.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Products.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def put(self, request, id, format=None):
        my_model =Products.objects.get(id=id)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # //////////////////end crud adimin///////////////////



# class CartListCreateView(views.APIView):
#     # permission_classes = (IsAuthenticated,)
#     serializer_class = CartSerializer

#     def get(self, request):
#         carts = Cart.objects.filter(user=self.request.user)
#         serializer = CartSerializer(carts, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = CartSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=self.request.user)
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

# class CartRetrieveUpdateDestroyView(views.APIView):
#     # permission_classes = (IsAuthenticated,)
#     serializer_class = CartSerializer

    # def get_object(self, pk):
    #     try:
    #         return Cart.objects.get(pk=pk, user=self.request.user)
    #     except Cart.DoesNotExist:
    #         return "not"
# when work on cart without user -return this function first
    # def get(self, request, *args,**kwargs):
    #     mycart =Cart.objects.all()
    #     serializer = CartSerializer(mycart,many=True)
    #     return Response(serializer.data)
    
    # def post(self,request,*args,**kwargs):
    #     # req = request.POST.getlist('desc[]')
    #     api_serializer = CartSerializer(data=request.data, context={'products': request.products})
    #     # api_serializer=CartSerializer(data=request.data)
    #     print(request.data)
    #     if api_serializer.is_valid():
    #         api_serializer.save()
    #         return Response(api_serializer.data,status=status.HTTP_201_CREATED)
    #     else:
    #         print('error',api_serializer.errors)
    #         return Response(api_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
# ///////////////////////////////until here////////////////////////
#     def put(self, request, pk):
#         cart = self.get_object(pk)
#         serializer = CartSerializer(cart, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)

#     def delete(self, request, pk):
#         cart = self.get_object(pk)
#         cart.delete()
#         return Response(status=204)
# /////////////// end crud cart////////////////////

# ///////////////profile crud/////////////////
@permission_classes([IsAuthenticated])
class ProfileView(APIView):
    def get(self, request):
        my_model = Profile.objects.all()
        serializer = ProfileSerializer(my_model, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = ProfileSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        my_model = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        my_model = Profile.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# //////////////// category crud/////////////////////

class CreateCategoryView(APIView):
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            category = serializer.save()
            return Response({'id': category.id})
        return Response(serializer.errors, status=400)
    def get(self, request,  format=None):
        my_model = Category.objects.all()
        serializer = CategorySerializer(my_model, many=True)
        return Response(serializer.data)
    