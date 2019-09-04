from django.db import models
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
import datetime
from . import models as tasks_models
from core import jwt_utils


class BaseTaskFieldsMixin(models.Model):
    """
    Mixin with base fields for models related with tasks
    """

    created = models.DateTimeField(
        verbose_name='created',
        help_text='Created date and time',
        # auto_now_add=True,
        default=timezone.now
    )

    updated = models.DateTimeField(
        verbose_name='updated',
        help_text='Updated date and time',
        auto_now=True,
    )

    due_to = models.DateField(
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

    @property
    def is_deadline_in_danger(self):
        t_of_danger = datetime.datetime.now() - datetime.timedelta(hours=24)
        deadline = datetime.datetime.combine(self.due_to, datetime.time())
        return t_of_danger > deadline

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.completed:
            self.completed_date = timezone.now()
        if not self.completed and self.completed_date:
            self.completed_date = None
        super().save(*args, **kwargs)


class BaseTaskBulkActionMixin(generics.GenericAPIView):
    """
    Mixin for DRF views, which allows to bulk actions,
    like mark multiple BaseTask objects as completed
    """

    lookup_field = "ids"
    _counter = 0

    def get_queryset(self):
        ids = self.request.data.get(self.lookup_field)
        return tasks_models.BaseTask.objects.filter(id__in=ids)

    def post(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if not qs:
            return Response(status=status.HTTP_204_NO_CONTENT)

        self.perform_bulk_action(objects=qs)

        if self._counter == len(qs):
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_action(self, instance):
        pass

    def perform_bulk_action(self, objects):
        for obj in objects:
            self.perform_action(instance=obj)


class JwtUserInfoMixin:
    """
    Mixin to get information about user from JWT token,
    needed for queryset filtering in views
    """

    def user_id(self):
        token = self.request.META.get("HTTP_AUTHORIZATION", " ").split(' ')[1]
        if token:
            return jwt_utils.get_user_id_from_token(token)
        return None
