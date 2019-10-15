from rest_framework import serializers
from . import models


class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskCategory
        fields = "__all__"


class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskStatus
        fields = "__all__"


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubTask
        fields = "__all__"


class BaseTaskSerializer(serializers.ModelSerializer):
    status = TaskStatusSerializer(read_only=False)

    class Meta:
        model = models.BaseTask
        fields = "__all__"


class BaseTaskCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.BaseTask
        fields = "__all__"
