from django.urls import path
from .views import ProfileListAPIView, ProfileDetailAPIView

app_name = 'accounts'

urlpatterns = [
    path('profiles/user/', ProfileDetailAPIView.as_view(), name='user_profile'),
    path('profiles/', ProfileListAPIView.as_view(), name='profile_list'),
]