from rest_framework import serializers
from .models import Course, Student, AcademicRecord

# 1. Basic Course Serializer (For lists)
class CourseSerializer(serializers.ModelSerializer):
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'code', 'created_at', 'student_count']
        read_only_fields = ['lecturer']

    def get_student_count(self, obj):
        # Count how many AcademicRecords exist for this course
        return AcademicRecord.objects.filter(course=obj).count()

# 2. Student Serializer
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'matric_no']

# 3. Record Serializer (Links Student -> Course with Grades)
class AcademicRecordSerializer(serializers.ModelSerializer):
    student = StudentSerializer() 
    
    class Meta:
        model = AcademicRecord
        fields = ['id', 'student', 'risk_level', 'attendance_score', 'test_score', 'predicted_failure_prob']

# 4. Detailed Course Serializer (For the Single Course Page)
class CourseDetailSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'code', 'created_at', 'students']
        read_only_fields = ['lecturer']

    def get_students(self, obj):
        records = AcademicRecord.objects.filter(course=obj)
        return AcademicRecordSerializer(records, many=True).data