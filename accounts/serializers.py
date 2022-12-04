from rest_framework import serializers
from rest_framework.authtoken.models import Token

from . import models


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = models.Profile
        fields = '__all__'


class TokenSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Token
        fields=('key', 'user')