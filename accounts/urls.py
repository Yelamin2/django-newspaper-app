from django.urls import path
from .views import ProfileListAPIView, ProfileDetailAPIView, UsersListAPIView

app_name = 'accounts'

urlpatterns = [
    path('profiles/user/', ProfileDetailAPIView.as_view(), name='user_profile'),
    path('profiles/', ProfileListAPIView.as_view(), name='profile_list'),
    path('users/', UsersListAPIView.as_view(), name="users" ),
]