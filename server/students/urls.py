from django.urls import path
from .views import (
    CourseListCreateView, 
    CourseDetailView, 
    AddStudentView, 
    UpdatePerformanceView, 
    BulkUploadView, 
    SendInterventionView,
    StudentListView,
    DashboardAnalyticsView # <--- Import
)

urlpatterns = [
    path('courses/', CourseListCreateView.as_view(), name='course-list'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('courses/<int:course_id>/add_student/', AddStudentView.as_view(), name='add-student'),
    path('courses/<int:course_id>/upload/', BulkUploadView.as_view(), name='bulk-upload'),
    
    path('records/<int:record_id>/update/', UpdatePerformanceView.as_view(), name='update-performance'),
    path('records/<int:record_id>/intervene/', SendInterventionView.as_view(), name='send-intervention'),
    
    path('students/', StudentListView.as_view(), name='student-list'),
    path('analytics/', DashboardAnalyticsView.as_view(), name='dashboard-analytics'),
]