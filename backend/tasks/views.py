from rest_framework import generics, views, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from . import mixins
from . import models
from . import serializers
from . import stats


class StandardResultsSetPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    page_size = 20
    max_page_size = 20


class TaskCategoryList(generics.ListAPIView):
    queryset = models.TaskCategory.objects.all()
    serializer_class = serializers.TaskCategorySerializer
    permission_classes = (AllowAny,)


class TaskStatusList(generics.ListAPIView, mixins.JwtUserInfoMixin):
    serializer_class = serializers.TaskStatusSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        user_id = self.user_id()
        return models.TaskStatus.objects.filter(user=1)


class BaseTaskList(generics.ListAPIView, mixins.JwtUserInfoMixin):
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)
    pagination_class = StandardResultsSetPagination
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        filter_by = self.request.GET.get("filter_by")
        filter_by_id = self.request.GET.get("id")
        # user_id = self.user_id()
        user_id = 4
        if user_id:
            if filter_by == "priority":
                return models.BaseTask.objects.filter(created_by=user_id, priority=filter_by_id)

            if filter_by == "status":
                return models.BaseTask.objects.filter(created_by=user_id, status=filter_by_id)

            return models.BaseTask.objects.filter(created_by=user_id)
        
        return []


class SubTaskList(generics.ListAPIView):
    queryset = models.SubTask.objects.all()
    serializer_class = serializers.SubTaskSerializer
    permission_classes = (AllowAny,)


class BaseTaskUpdate(generics.UpdateAPIView):
    queryset = models.BaseTask.objects.all()
    serializer_class = serializers.BaseTaskUpdateSerializer
    permission_classes = (AllowAny,)


class BaseTaskDelete(generics.DestroyAPIView):
    queryset = models.BaseTask.objects.all()
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)


class BaseTaskCreate(generics.CreateAPIView):
    queryset = models.BaseTask.objects.all()
    serializer_class = serializers.BaseTaskUpdateSerializer
    permission_classes = (AllowAny,)


class BaseTaskBulkDelete(mixins.BaseTaskBulkActionMixin):
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)

    def perform_action(self, instance):
        instance.delete()
        self._counter += 1


class BaseTaskBulkComplete(mixins.BaseTaskBulkActionMixin):
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        ids = self.request.data.get(self.lookup_field)
        return models.BaseTask.objects.filter(
            completed=False,
            id__in=ids
        )

    def perform_action(self, instance):
        status_completed = models.TaskStatus.objects.get(name='Completed')
        instance.status = status_completed
        instance.completed = True
        instance.save()
        self._counter += 1


class BaseTaskBulkStar(mixins.BaseTaskBulkActionMixin):
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        ids = self.request.data.get(self.lookup_field)
        return models.BaseTask.objects.filter(
            is_star=False,
            id__in=ids
        )

    def perform_action(self, instance):
        instance.is_star = True
        instance.save()
        self._counter += 1


class BaseStatsEisenhowerMatrix(views.APIView, mixins.JwtUserInfoMixin):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        matrix = stats.gen_eisenhower_matrix_stats(user_id=self.user_id())
        return Response(matrix)


class BaseStatsNewAndOld(views.APIView, mixins.JwtUserInfoMixin):
    permission_classes = (AllowAny,)

    def get(self, request):
        statuses = stats.tasks_new_and_with_deadline_stats(how_much=3, user_id=self.user_id())
        return Response(statuses)


class BaseStatsStatuses(views.APIView, mixins.JwtUserInfoMixin):
    permission_classes = (AllowAny,)

    def get(self, request):
        statuses = stats.tasks_statuses_stats(user_id=self.user_id())
        return Response(statuses)


class BaseStatsStatusesChart(views.APIView, mixins.JwtUserInfoMixin):
    permission_classes = (AllowAny,)

    def get(self, request):
        data = stats.tasks_statuses_chart(user_id=self.user_id(), days=10)
        return Response(data)
