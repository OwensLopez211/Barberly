# services/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Service, ServiceCategory
from .serializers import ServiceSerializer, ServiceCategorySerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit services.
    Others can only read.
    """
    
    def has_permission(self, request, view):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to admins
        return request.user and request.user.role == 'admin'

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    
    @action(detail=True, methods=['get'])
    def services(self, request, pk=None):
        category = self.get_object()
        services = Service.objects.filter(category=category, is_active=True)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'duration']
    
    def get_queryset(self):
        queryset = Service.objects.all()
        
        # Only show active services to non-admin users
        if not self.request.user.is_authenticated or self.request.user.role != 'admin':
            queryset = queryset.filter(is_active=True)
        
        return queryset