from django.urls import path
from . import views


urlpatterns = [
    path('category_list/', views.TaskCategoryList.as_view()),
    path('task_list/', views.BaseTaskList.as_view()),
    path('sub_task_list/', views.SubTaskList.as_view()),
]
