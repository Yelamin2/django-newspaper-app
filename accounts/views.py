from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.shortcuts import render, get_object_or_404

from . import models
from . import serializers
from . import permissions

# Create your views here.
class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Profile.objects.all()
    serializer_class=serializers.ProfileSerializer
    permission_classes = (permissions.ProfilePermissions,)

    def get_object(self):
        return get_object_or_404(models.Profile, user=self.request.user)