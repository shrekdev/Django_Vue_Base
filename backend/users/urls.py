from django.urls import path
from .views import ActivateUserByGet


urlpatterns = [
    path('activate/<str:uid>/<str:token>/', ActivateUserByGet.as_view()),
]
