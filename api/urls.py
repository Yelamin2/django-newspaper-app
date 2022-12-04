from django.urls import path, include
from . import views

urlpatterns = [
    path('accounts/',include('accounts.urls')),
    path('articles/', include ('articles.urls')),

]