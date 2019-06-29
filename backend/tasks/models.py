from django.contrib.auth import get_user_model
from django.db import models
from .mixins import BaseTaskFieldsMixin


CustomUser = get_user_model()


class TaskCategory(models.Model):
    """
    Model representing a single category for Task model
    """

    CATEGORY_COLORS = (
        ('#808080', 'gray'),
        ('#C0C0C0', 'silver'),
        ('#800000', 'maroon'),
        ('#FF0000', 'red'),
        ('#808000', 'olive'),
        ('#FFFF00', 'yellow'),
        ('#00FF00', 'lime'),
        ('#008080', 'teal'),
        ('#00FFFF', 'aqua'),
        ('#000080', 'navy'),
        ('#0000FF', 'blue'),
        ('#800080', 'purple'),
        ('#FF00FF', 'fuchsia'),
    )

    name = models.CharField(
        verbose_name='category name',
        help_text='Category name (up to 30 characters)',
        max_length=30,
        unique=True,
    )

    color = models.CharField(
        verbose_name='color',
        help_text='Color of category (HEX)',
        choices=CATEGORY_COLORS,
        default='#0000FF',
        max_length=7,
    )

    class Meta:
        verbose_name = 'Task category'
        verbose_name_plural = 'Task categories'

    def __str__(self):
        return self.name


class TaskStatus(models.Model):
    """
    Model representing a single status for Task model
    """

    name = models.CharField(
        verbose_name='status name',
        help_text='status name (up to 30 characters)',
        max_length=30,
        unique=True,
    )

    color = models.CharField(
        verbose_name='color',
        help_text='Color of Task Status (HEX)',
        default='#0000FF',
        max_length=7,
    )

    class Meta:
        verbose_name = 'Task Status'
        verbose_name_plural = 'Task Status'

    def __str__(self):
        return self.name


class BaseTask(BaseTaskFieldsMixin):
    """
    Model representing a single BaseTask with optional SubTasks
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

    created_by = models.ForeignKey(
        to=CustomUser,
        verbose_name='created by',
        help_text='The user who created task',
        related_name="base_tasks",
        on_delete=models.CASCADE,
    )

    assigned_to = models.ForeignKey(
        to=CustomUser,
        verbose_name='assigned to',
        help_text='The user for whom the subtask has been assigned',
        related_name="base_tasks_assigned",
        on_delete=models.CASCADE,
    )

    title = models.CharField(
        verbose_name='task title',
        help_text='Title of your task (up to 120 characters)',
        max_length=120,
    )

    priority = models.CharField(
        verbose_name='task priority',
        help_text='Task priority (according to The Eisenhover Matrix)',
        max_length=1,
        choices=CHOICES_MATRIX,
        default='1',
    )

    # status = models.CharField(
    #     verbose_name='task status',
    #     help_text='Current task status',
    #     max_length=1,
    #     choices=TASK_STATUSES,
    #     default='1',
    # )

    status = models.ForeignKey(
        to=TaskStatus,
        verbose_name='task status',
        help_text='Current task status',
        on_delete=models.CASCADE,
    )

    category = models.ManyToManyField(
        to=TaskCategory,
        related_name='tasks',
        verbose_name='category',
        help_text='The category the task will be marked',
    )

    class Meta:
        verbose_name = 'Base Task'
        verbose_name_plural = 'Base Tasks'
        unique_together = ['title', 'created_by']
        ordering = ['status', 'priority']

    def __str__(self):
        return self.title

    def display_category(self):
        """
        Create a string for the BaseTask (to display category in Admin site)
        """

        return ', '.join([category.name for category in self.category.all()[:3]])


class SubTask(BaseTaskFieldsMixin):
    """
    Model representing a single SubTask
    """

    SUBTASK_STATUSES = (
        ('1', 'New'),
        ('2', 'In Progress'),
        ('3', 'Suspended'),
        ('4', 'Cancelled'),
        ('5', 'Completed'),
    )

    created_by = models.ForeignKey(
        to=CustomUser,
        verbose_name='created by',
        help_text='The user who created subtask',
        related_name="sub_tasks",
        on_delete=models.CASCADE,
    )

    assigned_to = models.ForeignKey(
        to=CustomUser,
        verbose_name='assigned to',
        help_text='The user for whom the subtask has been assigned',
        related_name="sub_tasks_assigned",
        on_delete=models.CASCADE,
    )

    task = models.ForeignKey(
        to=BaseTask,
        verbose_name='task',
        help_text='Task to which the subtask will be connected',
        related_name='sub_tasks',
        on_delete=models.CASCADE,
    )

    title = models.CharField(
        verbose_name='subtask title',
        help_text='Title of your subtask (up to 80 characters)',
        max_length=80,
    )

    status = models.CharField(
        verbose_name='subtask status',
        help_text='Current subtask status',
        max_length=1,
        choices=SUBTASK_STATUSES,
        default='1',
    )

    class Meta:
        verbose_name = 'Sub Task'
        verbose_name_plural = 'Sub Tasks'
        unique_together = ['title', 'created_by']
        ordering = ['status']

    def __str__(self):
        return self.title
