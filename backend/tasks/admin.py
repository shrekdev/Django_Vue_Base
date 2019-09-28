from django.contrib import admin
from . import models


@admin.register(models.TaskStatus)
class TaskStatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'color', 'is_new', 'is_completed',)
    fields = ['name', 'color', 'is_new', 'is_completed']


@admin.register(models.TaskCategory)
class TaskCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'color',)
    fields = ['name', 'color']


@admin.register(models.BaseTask)
class BaseTaskAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'status', 'title', 'priority', 'created_by', 'assigned_to',
        'completed', 'due_to', 'completed_date', 'created', 'updated', 'display_category',
    )
    fields = [
        ('title', 'is_star'), ('status', 'completed'), 'priority', 'category',
        ('created_by', 'assigned_to'), ('due_to', 'completed_date'),
    ]


@admin.register(models.SubTask)
class SubTaskAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'status', 'title', 'task', 'created_by', 'assigned_to',
        'completed', 'due_to', 'completed_date', 'created', 'updated',
    )
    fields = [
        'title', 'task', ('status', 'completed'), ('created_by', 'assigned_to'),
        ('due_to', 'completed_date'),
    ]
