from django.contrib import admin
from . import models


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
        'title', ('status', 'completed'), 'priority', 'category',
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
