# appointments/serializers.py
from rest_framework import serializers
from .models import Appointment, AppointmentService
from accounts.serializers import UserSerializer
from services.serializers import ServiceSerializer

class AppointmentServiceSerializer(serializers.ModelSerializer):
    service_details = ServiceSerializer(source='service', read_only=True)
    
    class Meta:
        model = AppointmentService
        fields = ['service', 'service_details']

class AppointmentSerializer(serializers.ModelSerializer):
    client_details = UserSerializer(source='client', read_only=True)
    stylist_details = UserSerializer(source='stylist', read_only=True)
    services_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'client', 'client_details', 'stylist', 'stylist_details',
            'date', 'start_time', 'end_time', 'status', 'notes',
            'total_price', 'services', 'services_details'
        ]
        read_only_fields = ['id', 'total_price']
    
    def get_services_details(self, obj):
        appointment_services = AppointmentService.objects.filter(appointment=obj)
        return AppointmentServiceSerializer(appointment_services, many=True).data
    
    def create(self, validated_data):
        services = validated_data.pop('services', [])
        appointment = Appointment.objects.create(**validated_data)
        
        # Add services to the appointment
        for service in services:
            AppointmentService.objects.create(appointment=appointment, service=service)
        
        # Calculate total price
        appointment.calculate_total_price()
        
        return appointment
    
    def update(self, instance, validated_data):
        services = validated_data.pop('services', None)
        
        # Update appointment fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update services if provided
        if services is not None:
            # Remove existing services
            AppointmentService.objects.filter(appointment=instance).delete()
            
            # Add new services
            for service in services:
                AppointmentService.objects.create(appointment=instance, service=service)
            
            # Recalculate total price
            instance.calculate_total_price()
        
        return instance