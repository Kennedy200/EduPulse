from django.contrib import admin
from .models import Course, Student, AcademicRecord

admin.site.register(Course)
admin.site.register(Student)
admin.site.register(AcademicRecord)