from django.db import models
from django.conf import settings

CATEGORIES= (
    ("Politics", "Politics"),
    ("Lifestyle", "Lifestyle"),
    ("Sports", "Sports"),
    ("Business", "Business"),
)

# class Category(models.Model):
#     category=models.CharField(
#         max_length=20,
#         choices= CATEGORIES,
#         )


class Article(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now= True)
    is_published = models.BooleanField(default=False)
    category=models.CharField(
        max_length=20,
        choices= CATEGORIES,
        )
    image = models.ImageField(
        upload_to='articles/',default='articles/default.jpeg')
    

    def __str__(self):
        return self.title
