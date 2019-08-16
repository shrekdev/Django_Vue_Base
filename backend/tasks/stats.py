from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from .models import BaseTask

CustomUser = get_user_model()


def gen_eisenhower_matrix_stats(user_id: int) -> dict:

    urgent_and_important = 0
    important_and_not_urgent = 0
    urgent_and_not_important = 0
    not_important_and_not_urgent = 0

    try:
        user = CustomUser.objects.get(id=user_id)
    except ObjectDoesNotExist:
        user = None

    if user is not None:
        urgent_and_important = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.URGENT_AND_IMPORTANT
        ).count()
        important_and_not_urgent = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.IMPORTANT_AND_NOT_URGENT
        ).count()
        urgent_and_not_important = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.URGENT_AND_NOT_IMPORTANT
        ).count()
        not_important_and_not_urgent = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.NOT_IMPORTANT_AND_NOT_URGENT
        ).count()

    content = {
        "urgent_and_important": urgent_and_important,
        "important_and_not_urgent": important_and_not_urgent,
        "urgent_and_not_important": urgent_and_not_important,
        "not_important_and_not_urgent": not_important_and_not_urgent
    }

    return content


def tasks_statuses_stats(how_much: int, user_id: int) -> dict:
    tasks_with_deadline = []
    recently_added = []

    try:
        user = CustomUser.objects.get(id=user_id)
    except ObjectDoesNotExist:
        user = None

    if user is not None:
        deadlines = BaseTask.objects.filter(
            due_to__isnull=False, created_by=user
        ).order_by('due_to')[0:how_much]

        fresh_tasks = BaseTask.objects.filter(
            created_by=user
        ).order_by('-created')[0:how_much]

        if deadlines:
            for task in deadlines:
                tasks_with_deadline.append(
                    {
                        "id": task.id,
                        "title": task.title,
                        "due_to": task.due_to,
                        "in_danger": task.is_deadline_in_danger
                    }
                )

        if fresh_tasks:
            for newly in fresh_tasks:
                recently_added.append(
                    {
                        "id": newly.id,
                        "title": newly.title,
                        "created": newly.created,
                        "category": newly.category.all()[0].name
                    }
                )

    content = {
        "tasks_newly_added": recently_added,
        "tasks_with_deadline_upcoming": tasks_with_deadline,
    }

    return content

