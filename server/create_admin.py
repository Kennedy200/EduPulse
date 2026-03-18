import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

def create_superuser():
    # SET YOUR CREDENTIALS HERE
    email = 'admin@edupulse.ng'
    password = 'AdminPassword123'
    full_name = 'System Admin'
    institution = 'EduPulse HQ'
    role = 'admin'

    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(
            email=email, 
            password=password, 
            full_name=full_name, 
            institution=institution, 
            role=role
        )
        print(f"--- Superuser {email} created successfully! ---")
    else:
        print(f"--- Superuser {email} already exists. ---")

if __name__ == "__main__":
    create_superuser()
