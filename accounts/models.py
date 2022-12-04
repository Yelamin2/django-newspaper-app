from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
class User(AbstractUser):
    pass

class Profile(models.Model):
    avatar = models.ImageField(
        upload_to='profiles/',default='profiles/default.jpeg')
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.user.username