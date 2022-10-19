from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile, User

# Register your models here.
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
admin.site.register(User, UserAdmin)
admin.site.register(Profile)