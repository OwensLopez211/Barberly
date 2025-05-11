# services/models.py
from django.db import models
import uuid

class ServiceCategory(models.Model):
    """Categories for salon services (e.g., Hair, Nails, Skin Care)."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name_plural = "Service Categories"
    
    def __str__(self):
        return self.name

class Service(models.Model):
    """Services offered by the salon."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in minutes")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        ServiceCategory, 
        on_delete=models.PROTECT,
        related_name='services'
    )
    is_active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='services/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - ${self.price}"