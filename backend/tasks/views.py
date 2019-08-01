from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

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


class BaseTaskBulkDelete(generics.GenericAPIView):
    serializer_class = serializers.BaseTaskSerializer
    permission_classes = (AllowAny,)
    lookup_field = "ids"

    _counter = 0

    def get_queryset(self):
        ids = self.request.data.get(self.lookup_field)
        return models.BaseTask.objects.filter(id__in=ids)

    def post(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if not qs:
            return Response(status=status.HTTP_204_NO_CONTENT)

        self.perform_bulk_destroy(objects=qs)

        if self._counter == len(qs):
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_destroy(self, instance):
        try:
            instance.delete()
        # TODO: catch more specific exception
        except Exception:
            pass
        else:
            self._counter += 1

    def perform_bulk_destroy(self, objects):
        for obj in objects:
            self.perform_destroy(instance=obj)
