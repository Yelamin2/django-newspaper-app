from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.shortcuts import get_object_or_404

from . import models
from . import serializers
from . import permissions

# Create your views here.
class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfileDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class= serializers.ProfileSerializer
    permission_classes= (IsAuthenticated, permissions.IsOwner,)

    def got_object(self):

        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj