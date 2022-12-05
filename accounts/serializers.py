from rest_framework import serializers
from rest_framework.authtoken.models import Token
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from django.conf import settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from dj_rest_auth.registration.serializers import RegisterSerializer
from . import models


class ProfileSerializer(serializers.ModelSerializer):
    # username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = models.Profile
        fields = '__all__'
        read_only_fields = ['user']


class TokenSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Token
        fields=('key', 'user')