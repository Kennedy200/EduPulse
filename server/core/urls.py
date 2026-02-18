from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Connect our accounts app here
    path('api/auth/', include('accounts.urls')),
    path('api/', include('students.urls')),
]