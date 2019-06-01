from django.db import models
from django.conf import settings
import datetime


class Task(models.Model):
    """
    Model representing a single Task with optional SubTasks
    """

    CHOICES_MATRIX = (
        ('1', 'Urgent and important'),
        ('2', 'Important and not urgent'),
        ('3', 'Urgent and not important'),
        ('4', 'Not important and not urgent'),
    )

    TASK_STATUSES = (
        ('1', 'New'),
        ('2', 'In Progress'),
        ('3', 'Suspended'),
        ('4', 'Cancelled'),
        ('5', 'Completed'),
    )

    title = models.CharField(
        verbose_name='task title',
        help_text='Title of your task (up to 120 characters)',
        max_length=120,
    )

    created = models.DateTimeField(
        verbose_name='created',
        help_text='Created date and time',
        auto_now_add=True,
    )

    updated = models.DateTimeField(
        verbose_name='updated',
        help_text='Updated date and time',
        auto_now=True,
    )

    due_to = models.DateTimeField(
        verbose_name='due to',
        help_text='Expected date and time of completion',
        null=True,
        blank=True,
    )

    priority = models.CharField(
        verbose_name='task priority',
        help_text='Task priority (according to The Eisenhover Matrix)',
        max_length=1,
        choices=CHOICES_MATRIX,
        default='1',
    )

    status = models.CharField(
        verbose_name='task status',
        help_text='Current task status',
        max_length=1,
        choices=TASK_STATUSES,
        default='1',
    )

    completed = models.BooleanField(
        verbose_name='completed',
        default=False,
    )

    completed_date = models.DateTimeField(
        blank=True,
        null=True,
    )

    created_by = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        verbose_name='created by',
        help_text='The user who created task',
        related_name="tasks_created",
        on_delete=models.CASCADE,
    )

    assigned_to = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        verbose_name='assigned by',
        help_text='The user for whom the task has been assigned',
        blank=True,
        null=True,
        related_name="tasks_assigned",
        on_delete=models.CASCADE,
    )

    # TODO: ForeignKey to SubTask model

    def save(self, *args, **kwargs):
        if self.completed:
            self.completed_date = datetime.datetime.now()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
        ordering = ['created', 'priority']

    def __str__(self):
        return self.title

# TODO: SubTask model
# TODO: Category model
# TODO: Comment model
