from django.urls import path

from . import views

urlpatterns = [
    # url's for base CRUD on tasks
    path('create/', views.BaseTaskCreateUpdateAPIView.as_view()),
    path('list/', views.BaseTaskListDeleteAPIView.as_view()),
    path('update/<pk>/', views.BaseTaskCreateUpdateAPIView.as_view()),
    path('delete/<pk>/', views.BaseTaskListDeleteAPIView.as_view()),

    # url's for task categories
    path('category/list/', views.TaskCategoryList.as_view()),

    # url's for task statuses
    path('status/list/', views.TaskStatusAPIView.as_view()),
    path('status/create/', views.TaskStatusAPIView.as_view()),
    path('status/update/<pk>/', views.TaskStatusAPIView.as_view()),

    # url's for bulk actions
    path('bulk/delete', views.BaseTaskBulkDelete.as_view()),
    path('bulk/completed', views.BaseTaskBulkComplete.as_view()),
    path('bulk/star', views.BaseTaskBulkStar.as_view()),

    # url's to get statistics for dashboard
    path('stats/eisenhower-matrix/', views.BaseStatsEisenhowerMatrix.as_view()),
    path('stats/new-and-old/', views.BaseStatsNewAndOld.as_view()),
    path('stats/statuses/', views.BaseStatsStatuses.as_view()),
    path('stats/statuses/chart/', views.BaseStatsStatusesChart.as_view()),
]
