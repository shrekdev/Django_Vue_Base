from rest_framework import generics
from rest_framework.permissions import AllowAny

from . import mixins
from . import models
from . import serializers


class TaskCategoryList(generics.ListAPIView):
    queryset = models.TaskCategory.objects.all()
    serializer_class = serializers.TaskCategorySerializer
    permission_classes = (AllowAny,)


class TaskStatusList(generics.ListAPIView):
    queryset = models.TaskStatus.objects.all()
    serializer_class = serializers.TaskStatusSerializer
    permission_classes = (AllowAny,)


class BaseTaskList(generics.ListAPIView):
    queryset = models.BaseTask.objects.all()
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)


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
