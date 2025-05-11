# accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, LoginView, LogoutView,
    UserViewSet, StylistViewSet, ClientViewSet
)

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('stylists', StylistViewSet, basename='stylist')
router.register('clients', ClientViewSet, basename='client')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]