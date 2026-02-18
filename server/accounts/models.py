from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# 1. Create a Custom Manager to handle Email-based login
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(('Superuser must have is_superuser=True.'))
        
        return self.create_user(email, password, **extra_fields)


# 2. Update the User Model to use this Manager
class User(AbstractUser):
    ROLE_CHOICES = (
        ('lecturer', 'Lecturer'),
        ('advisor', 'Academic Advisor'),
        ('admin', 'Administrator'),
        ('vc', 'Vice Chancellor'),
    )

    username = None
    email = models.EmailField(unique=True)
    
    full_name = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='lecturer')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'institution', 'role']

    # Link the Custom Manager here
    objects = CustomUserManager()

    def __str__(self):
        return self.email