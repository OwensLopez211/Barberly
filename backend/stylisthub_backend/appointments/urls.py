# appointments/urls.py (actualizar)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, AnalyticsViewSet

router = DefaultRouter()
router.register('appointments', AppointmentViewSet)
router.register('analytics', AnalyticsViewSet, basename='analytics')

urlpatterns = [
    path('', include(router.urls)),
]