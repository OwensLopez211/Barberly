# accounts/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Client, Stylist

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create the appropriate profile when a user is created."""
    if created:
        if instance.role == 'client':
            Client.objects.create(user=instance)
        elif instance.role == 'stylist':
            Stylist.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save the appropriate profile when a user is saved."""
    if instance.role == 'client' and hasattr(instance, 'client_profile'):
        instance.client_profile.save()
    elif instance.role == 'stylist' and hasattr(instance, 'stylist_profile'):
        instance.stylist_profile.save()