from rest_framework import serializers
from .models import User

# Serializer to view User Data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'institution', 'role']

# Serializer to Register a New User
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'full_name', 'institution', 'role', 'password']

    def create(self, validated_data):
        # Create user securely (hashing the password)
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            institution=validated_data['institution'],
            role=validated_data['role']
        )
        return user