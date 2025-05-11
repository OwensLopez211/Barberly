# appointments/views.py
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.viewsets import ViewSet
from django.db.models import Count, Sum, Avg
from django.db.models.functions import TruncDate
from datetime import date, timedelta
from django.utils import timezone

class AppointmentPermission(permissions.BasePermission):
    """
    Custom permission for appointments:
    - Admins can view and edit all appointments
    - Stylists can view and edit their own appointments
    - Clients can view and edit their own appointments
    """
    
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        # Admin can do anything
        if user.role == 'admin':
            return True
        
        # Stylist can view and edit their own appointments
        if user.role == 'stylist' and obj.stylist == user:
            return True
        
        # Client can view and edit their own appointments
        if user.role == 'client' and obj.client == user:
            return True
        
        return False

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AppointmentPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['date', 'status', 'stylist', 'client']
    search_fields = ['notes', 'client__name', 'stylist__name']
    ordering_fields = ['date', 'start_time', 'status', 'total_price']
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'admin':
            return Appointment.objects.all()
        
        if user.role == 'stylist':
            return Appointment.objects.filter(stylist=user)
        
        if user.role == 'client':
            return Appointment.objects.filter(client=user)
        
        return Appointment.objects.none()
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get all appointments for today."""
        from datetime import date
        
        today = date.today()
        queryset = self.get_queryset().filter(date=today)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get all upcoming appointments."""
        from datetime import date
        
        today = date.today()
        queryset = self.get_queryset().filter(
            Q(date=today, start_time__gt=date.today()) | 
            Q(date__gt=today)
        ).filter(status='scheduled')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an appointment."""
        appointment = self.get_object()
        appointment.status = 'cancelled'
        appointment.save()
        serializer = self.get_serializer(appointment)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark an appointment as completed."""
        appointment = self.get_object()
        appointment.status = 'completed'
        appointment.save()
        serializer = self.get_serializer(appointment)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def no_show(self, request, pk=None):
        """Mark an appointment as no-show."""
        appointment = self.get_object()
        appointment.status = 'no-show'
        appointment.save()
        serializer = self.get_serializer(appointment)
        return Response(serializer.data)
    

class AnalyticsViewSet(ViewSet):
    """Provides analytics data for the admin dashboard."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def dispatch(self, request, *args, **kwargs):
        # Only allow admins to access analytics
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({"detail": "You do not have permission to access this resource."},
                          status=status.HTTP_403_FORBIDDEN)
        return super().dispatch(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def daily_stats(self, request):
        """Get appointment stats for last 30 days."""
        # Start and end dates
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        
        # Get appointments per day
        daily_stats = (
            Appointment.objects
            .filter(date__range=[start_date, end_date])
            .annotate(day=TruncDate('date'))
            .values('day')
            .annotate(
                total_appointments=Count('id'),
                total_revenue=Sum('total_price'),
                completed_rate=Count('id', filter=Q(status='completed')) * 100.0 / Count('id')
            )
            .order_by('day')
        )
        
        return Response(daily_stats)
    
    @action(detail=False, methods=['get'])
    def stylist_performance(self, request):
        """Get performance metrics for stylists."""
        # Get appointment stats per stylist
        stylist_stats = (
            Appointment.objects
            .values('stylist', 'stylist__name')
            .annotate(
                appointments_count=Count('id'),
                total_revenue=Sum('total_price'),
                # A simple proxy for client retention: percentage of clients who have multiple appointments
                client_retention_rate=Count('client', distinct=True) * 100.0 / 
                                     Count('client', filter=Q(client__client_appointments__count__gt=1), distinct=True)
            )
            .order_by('-total_revenue')
        )
        
        return Response(stylist_stats)
    
    @action(detail=False, methods=['get'])
    def service_popularity(self, request):
        """Get popularity metrics for services."""
        from services.models import Service
        
        # Get appointment stats per service
        service_stats = (
            AppointmentService.objects
            .values('service', 'service__name')
            .annotate(
                booking_count=Count('appointment'),
                revenue=Sum('service__price')
            )
            .order_by('-booking_count')
        )
        
        return Response(service_stats)