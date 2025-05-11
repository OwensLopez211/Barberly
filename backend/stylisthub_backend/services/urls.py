# services/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ServiceCategoryViewSet

router = DefaultRouter()
router.register('services', ServiceViewSet)
router.register('service-categories', ServiceCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]