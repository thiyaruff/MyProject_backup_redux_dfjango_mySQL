from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', views.register),
    path('', views.index),
    path('products/',views.APIViews.as_view()),
    path('products/<int:id>',views.APIViews.as_view()),
    # path('cart/',views.CartRetrieveUpdateDestroyView.as_view()),
    path('profile/',views.ProfileView.as_view()),
    path('profile/<int:id>',views.ProfileView.as_view()),
    path('category/',views.CreateCategoryView.as_view())
]


