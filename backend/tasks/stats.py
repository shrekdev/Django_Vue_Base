import datetime
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from .models import BaseTask, TaskStatus

CustomUser = get_user_model()


def gen_eisenhower_matrix_stats(user_id: int) -> dict:

    urgent_and_important = []
    important_and_not_urgent = []
    urgent_and_not_important = []
    not_important_and_not_urgent = []
    q1 = 0
    q2 = 0
    q3 = 0
    q4 = 0

    try:
        user = CustomUser.objects.get(id=user_id)
    except ObjectDoesNotExist:
        user = None

    if user is not None:
        q1 = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.URGENT_AND_IMPORTANT
        ).exclude(status__name="Completed").count()
        q2 = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.IMPORTANT_AND_NOT_URGENT
        ).exclude(status__name="Completed").count()
        q3 = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.URGENT_AND_NOT_IMPORTANT
        ).exclude(status__name="Completed").count()
        q4 = BaseTask.objects.filter(
            created_by=user, priority=BaseTask.NOT_IMPORTANT_AND_NOT_URGENT
        ).exclude(status__name="Completed").count()

    urgent_and_important.append(
        {
            "qty": q1,
            "label": "do first",
            "color": "green",
            "id": BaseTask.URGENT_AND_IMPORTANT
        }
    )

    important_and_not_urgent.append(
        {
            "qty": q2,
            "label": "do later",
            "color": "blue",
            "id": BaseTask.IMPORTANT_AND_NOT_URGENT
        }
    )

    urgent_and_not_important.append(
        {
            "qty": q3,
            "label": "delegate",
            "color": "orange",
            "id": BaseTask.URGENT_AND_NOT_IMPORTANT
        }
    )

    not_important_and_not_urgent.append(
        {
            "qty": q4,
            "label": "eliminate",
            "color": "pink",
            "id": BaseTask.NOT_IMPORTANT_AND_NOT_URGENT
        }
    )

    content = {
        "urgent_and_important": urgent_and_important,
        "important_and_not_urgent": important_and_not_urgent,
        "urgent_and_not_important": urgent_and_not_important,
        "not_important_and_not_urgent": not_important_and_not_urgent
        }

    return content


def tasks_new_and_with_deadline_stats(how_much: int, user_id: int) -> dict:
    tasks_with_deadline = []
    recently_added = []

    try:
        user = CustomUser.objects.get(id=user_id)
    except ObjectDoesNotExist:
        user = None

    if user is not None:
        tnow = timezone.now()
        deadlines = BaseTask.objects.filter(due_to__gte=tnow, created_by=user).order_by('due_to')[0:how_much]
        fresh_tasks = BaseTask.objects.filter(created_by=user).order_by('-created')[0:how_much]

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


def tasks_statuses_stats(user_id: int) -> dict:

    stat = []
    task_status_list = list(TaskStatus.objects.filter(user=user_id).order_by("id"))
    if task_status_list:
        for task_status in task_status_list:
            tmp = BaseTask.objects.filter(created_by=user_id, status=task_status)
            if tmp:
                stat.append([
                    {
                        "id": task_status.id,
                        "label": task_status.name,
                        "color": task_status.color,
                        "qty": tmp.count(),
                    }
                ])

    content = {
        "status_list": stat
    }

    return content


def tasks_statuses_chart(user_id: str, days: int) -> dict:

    end_datetime = timezone.now()
    start_datetime = end_datetime - datetime.timedelta(days=days)

    user_tasks = list(BaseTask.objects.filter(
        created__gte=start_datetime, created__lte=end_datetime, created_by=user_id
    ))

    labels = sorted({s.created for s in user_tasks})
    status_list = [s for s in TaskStatus.objects.all().exclude(name="Completed")]

    datasets = []
    for status_input in status_list:
        tmp_agg = []
        for time_input in labels:
            agg = BaseTask.objects.filter(
                created=time_input, status__name=status_input.name
            ).count()
            tmp_agg.append(agg)

        datasets.append(
            {
                "fill": False,
                "label": status_input.name,
                "backgroundColor": status_input.color,
                "borderColor": status_input.color,
                "data": tmp_agg
            }
        )

    context = {
        "labels": sorted(l.strftime("%Y-%m-%d") for l in labels),
        "datasets": datasets
    }

    return {"data": context}
