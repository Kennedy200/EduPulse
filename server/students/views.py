import os
import joblib
import pandas as pd
import numpy as np
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import Course, Student, AcademicRecord
from .serializers import CourseSerializer, CourseDetailSerializer, StudentSerializer

# 1. List and Create Courses
class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(lecturer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(lecturer=self.request.user)

# 2. Retrieve Single Course with Students
class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(lecturer=self.request.user)

# 3. Add Student to Course
class AddStudentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id, lecturer=request.user)
        full_name = request.data.get('full_name')
        matric_no = request.data.get('matric_no')

        if not full_name or not matric_no:
            return Response({'error': 'Name and Matric No are required'}, status=status.HTTP_400_BAD_REQUEST)

        student, created = Student.objects.get_or_create(
            matric_no=matric_no,
            defaults={'full_name': full_name}
        )

        if AcademicRecord.objects.filter(student=student, course=course).exists():
            return Response({'error': 'Student already added'}, status=status.HTTP_400_BAD_REQUEST)

        AcademicRecord.objects.create(student=student, course=course, risk_level='green')
        return Response({'message': 'Student added successfully'}, status=status.HTTP_201_CREATED)

# 4. Update Performance (Single Student AI Check)
class UpdatePerformanceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    model_path = os.path.join(settings.BASE_DIR, 'ml_engine', 'risk_model.pkl')
    try:
        model = joblib.load(model_path)
    except:
        model = None

    def post(self, request, record_id):
        record = get_object_or_404(AcademicRecord, id=record_id)
        if record.course.lecturer != self.request.user:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        try:
            attendance = float(request.data.get('attendance', 0))
            test_score = float(request.data.get('test_score', 0))
        except:
            return Response({'error': 'Invalid values'}, status=status.HTTP_400_BAD_REQUEST)

        risk = 'green'
        prob = 0.0
        if self.model:
            try:
                input_data = pd.DataFrame([[attendance, test_score]], columns=['attendance', 'test_score'])
                prediction = self.model.predict(input_data)[0]
                prob_array = self.model.predict_proba(input_data)[0]
                prob = round(float(prob_array[prediction]), 2)
                risk = {0: 'green', 1: 'yellow', 2: 'red'}.get(prediction, 'green')
            except:
                if attendance < 50: risk = 'red'
        else:
            if attendance < 50: risk = 'red'

        record.attendance_score = attendance
        record.test_score = test_score
        record.risk_level = risk
        record.predicted_failure_prob = prob
        record.save()

        return Response({'message': 'Analysis Complete', 'risk_level': risk}, status=status.HTTP_200_OK)

# 5. Bulk Upload (Process CSV)
class BulkUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    model_path = os.path.join(settings.BASE_DIR, 'ml_engine', 'risk_model.pkl')
    try:
        model = joblib.load(model_path)
    except:
        model = None

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id, lecturer=request.user)
        if 'file' not in request.FILES:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']
        try:
            df = pd.read_csv(file)
            required_cols = ['matric_no', 'full_name', 'attendance', 'test_score']
            if not all(col in df.columns for col in required_cols):
                return Response({'error': f'CSV needs columns: {required_cols}'}, status=status.HTTP_400_BAD_REQUEST)

            count = 0
            for index, row in df.iterrows():
                student, _ = Student.objects.get_or_create(
                    matric_no=str(row['matric_no']),
                    defaults={'full_name': row['full_name']}
                )
                record, _ = AcademicRecord.objects.get_or_create(student=student, course=course)

                att = float(row['attendance'])
                score = float(row['test_score'])
                
                risk = 'green'
                prob = 0.0
                if self.model:
                    try:
                        input_data = pd.DataFrame([[att, score]], columns=['attendance', 'test_score'])
                        prediction = self.model.predict(input_data)[0]
                        prob = round(float(self.model.predict_proba(input_data)[0][prediction]), 2)
                        risk = {0: 'green', 1: 'yellow', 2: 'red'}.get(prediction, 'green')
                    except:
                        if att < 50: risk = 'red'
                else:
                    if att < 50: risk = 'red'

                record.attendance_score = att
                record.test_score = score
                record.risk_level = risk
                record.predicted_failure_prob = prob
                record.save()
                count += 1

            return Response({'message': f'Processed {count} students'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# 6. Send Intervention Email (UPDATED LOGIC)
class SendInterventionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, record_id):
        record = get_object_or_404(AcademicRecord, id=record_id)
        if record.course.lecturer != request.user:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        if record.risk_level == 'green':
            return Response({'message': 'Student is safe.'}, status=status.HTTP_200_OK)

        subject = f"Academic Alert: {record.course.code}"
        message = f"Dear {record.student.full_name},\n\n"
        if record.risk_level == 'red':
            message += f"URGENT: You are at HIGH RISK in {record.course.title}.\n"
            message += f"Current Score: {record.test_score}, Attendance: {record.attendance_score}%.\n"
            message += "Please meet your advisor immediately."
        else:
            message += f"WARNING: Your performance in {record.course.title} needs improvement.\n"
            message += "Please consider joining a study group."

        # recipients list: change this to your email for final testing
        recipient_list = ['student@university.edu.ng'] 

        try:
            send_mail(
                subject, 
                message, 
                settings.DEFAULT_FROM_EMAIL, # Use the new setting
                recipient_list, 
                fail_silently=False
            )
            return Response({'message': 'Intervention Email Sent!'}, status=status.HTTP_200_OK)
        except Exception as e:
            # This will print the exact SMTP error to your terminal for debugging
            print(f"SMTP ERROR: {e}")
            return Response({'error': 'Mail server error. Check terminal.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# 7. List All Students (For Directory Page)
class StudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Student.objects.filter(academicrecord__course__lecturer=self.request.user).distinct()

# 8. Dashboard Analytics (Pie & Bar Charts)
class DashboardAnalyticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        courses = Course.objects.filter(lecturer=request.user)
        all_records = AcademicRecord.objects.filter(course__in=courses)

        safe_count = all_records.filter(risk_level='green').count()
        warning_count = all_records.filter(risk_level='yellow').count()
        critical_count = all_records.filter(risk_level='red').count()

        pie_data = [
            {'name': 'Safe', 'value': safe_count, 'color': '#10B981'},
            {'name': 'Warning', 'value': warning_count, 'color': '#F59E0B'},
            {'name': 'Critical', 'value': critical_count, 'color': '#EF4444'},
        ]

        bar_data = []
        for course in courses:
            risk_count = AcademicRecord.objects.filter(course=course, risk_level='red').count()
            bar_data.append({'name': course.code, 'risk': risk_count})

        return Response({'pie_data': pie_data, 'bar_data': bar_data}, status=status.HTTP_200_OK)