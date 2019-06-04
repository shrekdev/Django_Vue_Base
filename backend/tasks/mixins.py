import datetime
from django.db import models


class BaseTaskFieldsMixin(models.Model):
    """
    Mixin with base fields for models related with tasks
    """

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

    completed = models.BooleanField(
        verbose_name='completed',
        help_text='Task completed?',
        default=False,
    )

    completed_date = models.DateTimeField(
        verbose_name='completed date',
        help_text='Task completed - date and time',
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        if self.completed:
            self.completed_date = datetime.datetime.now()
        super().save(*args, **kwargs)
