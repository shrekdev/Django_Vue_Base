from django.urls import path
from . import views


urlpatterns = [
    # TODO: change to category/list
    path('category_list/', views.TaskCategoryList.as_view()),
    # TODO: change to list/
    path('task_list/', views.BaseTaskList.as_view()),
    # TODO: change to sub/list/
    path('sub_task_list/', views.SubTaskList.as_view()),
    path('update/<pk>/', views.BaseTaskUpdate.as_view()),
    # path('update/completed/<pk>/', views.BaseTaskCompleted.as_view()),
    path('delete/<pk>/', views.BaseTaskDelete.as_view()),
    path('create/', views.BaseTaskCreate.as_view()),
    path('status/list/', views.TaskStatusList.as_view()),
]
