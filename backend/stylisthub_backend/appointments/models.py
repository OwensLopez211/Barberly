# appointments/models.py
from django.db import models
from django.conf import settings
from services.models import Service
import uuid

class Appointment(models.Model):
    """Client appointments with stylists."""
    
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no-show', 'No Show'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='client_appointments',
        limit_choices_to={'role': 'client'}
    )
    stylist = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='stylist_appointments',
        limit_choices_to={'role': 'stylist'}
    )
    services = models.ManyToManyField(Service, through='AppointmentService')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date', '-start_time']
    
    def __str__(self):
        return f"{self.client.name} - {self.stylist.name} - {self.date} {self.start_time}"
    
    def calculate_total_price(self):
        """Calculate the total price of all services in the appointment."""
        appointment_services = AppointmentService.objects.filter(appointment=self)
        total = sum(aps.service.price for aps in appointment_services)
        self.total_price = total
        self.save(update_fields=['total_price'])
        return total

class AppointmentService(models.Model):
    """Services included in an appointment."""
    
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.PROTECT)
    
    class Meta:
        unique_together = ('appointment', 'service')
    
    def __str__(self):
        return f"{self.appointment} - {self.service.name}"