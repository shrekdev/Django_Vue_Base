from django.contrib.auth import get_user_model

from .models import BaseTask

CustomUser = get_user_model()


def gen_eisenhower_matrix_stats(user_id: int) -> dict:

    urgent_and_important = 0
    important_and_not_urgent = 0
    urgent_and_not_important = 0
    not_important_and_not_urgent = 0

    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.ObjectDoesNotExist:
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


def tasks_with_deadline_upcoming(how_much: int) -> list:
    tasks_with_deadline = BaseTask.objects.filter(due_to__isnull=False).order_by('-due_to')[0:how_much]
    elem = []

    if tasks_with_deadline:
        for task in tasks_with_deadline:
            elem.append(
                {
                    "id": task.id,
                    "title": task.title,
                    "due_to": task.due_to
                }
            )

    return elem


def tasks_newly_added(how_much: int) -> list:
    recently_added = BaseTask.objects.all().order_by('-created')[0:how_much]
    elem = []

    if recently_added:
        for newly in recently_added:
            elem.append(
                {
                    "id": newly.id,
                    "title": newly.title,
                    "category": newly.category.all()[0].name
                }
            )

    return elem
