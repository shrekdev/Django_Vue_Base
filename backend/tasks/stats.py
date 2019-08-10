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
