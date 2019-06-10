from rest_framework import serializers
from . import models


class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskCategory
        fields = "__all__"


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubTask
        fields = "__all__"


class BaseTaskSerializer(serializers.ModelSerializer):
    # sub_tasks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    sub_tasks = SubTaskSerializer(many=True, read_only=True)
    category = TaskCategorySerializer(many=True, read_only=True)

    class Meta:
        model = models.BaseTask
        fields = "__all__"
