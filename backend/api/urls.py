from django.urls import path
from .views import *

urlpatterns = [
    path('register', Register.as_view()),
    path('login', Login.as_view()),
    path('applications', Applications.as_view()),
    path('applications/<int:pk>/review', Review.as_view()),
    path('admin/applications', AdminApplications.as_view()),
    path('admin/applications/<int:pk>', AdminStatus.as_view())
]
