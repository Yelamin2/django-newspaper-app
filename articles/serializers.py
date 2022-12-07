from pyexpat import model
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

    
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model =Category
#         fields= '__all__'