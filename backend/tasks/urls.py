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
    # path('delete/<pk>/', views.BaseTaskDelete.as_view()),
    path('create/', views.BaseTaskCreate.as_view()),
    path('status/list/', views.TaskStatusList.as_view()),

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
