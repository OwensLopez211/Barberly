# services/management/commands/create_initial_data.py
from django.core.management.base import BaseCommand
from services.models import ServiceCategory, Service
import uuid

class Command(BaseCommand):
    help = 'Creates initial data for the StylistHub application'

    def handle(self, *args, **kwargs):
        # Create service categories
        hair_category = ServiceCategory.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d479'),
            name='Hair',
            description='Hair cutting, styling, and coloring services'
        )
        self.stdout.write(self.style.SUCCESS(f'Created Hair category'))
        
        nails_category = ServiceCategory.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d480'),
            name='Nails',
            description='Manicure and pedicure services'
        )
        self.stdout.write(self.style.SUCCESS(f'Created Nails category'))
        
        skin_category = ServiceCategory.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d481'),
            name='Skin Care',
            description='Facial treatments and skin care services'
        )
        self.stdout.write(self.style.SUCCESS(f'Created Skin Care category'))
        
        # Create services
        Service.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d482'),
            name='Haircut & Style',
            description='Professional haircut and styling',
            duration=45,
            price=35.00,
            category=hair_category,
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS(f'Created Haircut & Style service'))
        
        Service.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d483'),
            name='Hair Coloring',
            description='Full hair coloring service',
            duration=90,
            price=75.00,
            category=hair_category,
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS(f'Created Hair Coloring service'))
        
        Service.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d484'),
            name='Blowout',
            description='Professional blow dry and styling',
            duration=30,
            price=35.00,
            category=hair_category,
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS(f'Created Blowout service'))
        
        Service.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d485'),
            name='Manicure',
            description='Basic manicure service',
            duration=30,
            price=25.00,
            category=nails_category,
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS(f'Created Manicure service'))
        
        Service.objects.create(
            id=uuid.UUID('f47ac10b-58cc-4372-a567-0e02b2c3d486'),
            name='Facial',
            description='Deep cleansing facial treatment',
            duration=60,
            price=65.00,
            category=skin_category,
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS(f'Created Facial service'))
        
        self.stdout.write(self.style.SUCCESS('Initial data created successfully!'))