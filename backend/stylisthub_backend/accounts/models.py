# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
import uuid

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""
    
    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    """Custom User model that uses email as the unique identifier."""
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('stylist', 'Stylist'),
        ('client', 'Client'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(_('full name'), max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']
    
    objects = UserManager()
    
    def __str__(self):
        return self.email

class Client(models.Model):
    """Extended profile for users with 'client' role."""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    phone = models.CharField(max_length=20, blank=True)
    notes = models.TextField(blank=True)
    last_visit = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.user.name

class Stylist(models.Model):
    """Extended profile for users with 'stylist' role."""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stylist_profile')
    bio = models.TextField(blank=True)
    specialties = models.JSONField(default=list)
    
    def __str__(self):
        return self.user.name

class Schedule(models.Model):
    """Work schedule for stylists."""
    
    DAY_CHOICES = (
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    )
    
    stylist = models.ForeignKey(Stylist, on_delete=models.CASCADE, related_name='schedules')
    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    class Meta:
        unique_together = ('stylist', 'day', 'start_time')
    
    def __str__(self):
        return f"{self.stylist.user.name} - {self.get_day_display()} ({self.start_time} - {self.end_time})"