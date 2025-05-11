# accounts/serializers.py
from rest_framework import serializers
from .models import User, Client, Stylist, Schedule
from django.contrib.auth.password_validation import validate_password

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'day', 'start_time', 'end_time']

class StylistSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Stylist
        fields = ['bio', 'specialties', 'schedules']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['phone', 'notes', 'last_visit']

class UserSerializer(serializers.ModelSerializer):
    stylist_profile = StylistSerializer(read_only=True, required=False)
    client_profile = ClientSerializer(read_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'role', 'avatar', 'stylist_profile', 'client_profile']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password_confirm', 'role']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()