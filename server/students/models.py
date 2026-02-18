from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=200) # e.g. "Intro to AI"
    code = models.CharField(max_length=20)   # e.g. "CSC 401"
    lecturer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.title}"

class Student(models.Model):
    full_name = models.CharField(max_length=200)
    matric_no = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.full_name

class AcademicRecord(models.Model):
    RISK_CHOICES = (
        ('green', 'Safe'),
        ('yellow', 'Warning'),
        ('red', 'At Risk'),
    )

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    # Data points for ML
    attendance_score = models.FloatField(default=0.0) # 0 to 100
    test_score = models.FloatField(default=0.0)       # 0 to 100
    
    # The Prediction
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, default='green')
    predicted_failure_prob = models.FloatField(default=0.0) # 0.0 to 1.0

    def __str__(self):
        return f"{self.student.matric_no} in {self.course.code}"