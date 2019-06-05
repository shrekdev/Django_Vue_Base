from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from ._literals import *


class Command(BaseCommand):
    """
    Custom django-admin command to create some TaskCategory and BaseTask objects
    """

    help = "Create TaskCategory and BaseTask objects"

    def handle(self, *args, **options):

        self.stdout.write("Creating TaskCategory objects...")

        for i in range(HOW_MUCH_TASK_CATEGORIES):
            try:
                category = TaskCategory.objects.create(
                    name=DEMO_TASK_CATEGORY_NAME[i],
                    color=DEMO_TASK_CATEGORY_COLOR[i],
                )
                category.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"Category {DEMO_TASK_CATEGORY_NAME[i]} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created category: {DEMO_TASK_CATEGORY_NAME[i]}"))

        self.stdout.write("Creating BaseTask objects...")

        DEMO_TASK_RANDOM_CATEGORY = [
            random.choice(TaskCategory.objects.all()) for _ in range(HOW_MUCH_TASKS)
        ]

        for i in range(HOW_MUCH_TASKS):
            try:
                task = BaseTask.objects.create(
                    created_by=DEMO_TASK_RANDOM_USER[i],
                    assigned_to=DEMO_TASK_RANDOM_USER[i],
                    title=DEMO_TASK_RANDOM_TITLE[i],
                    priority=DEMO_TASK_RANDOM_PRIORITY[i],
                    status=DEMO_TASK_RANDOM_STATUS[i],
                    completed=True if DEMO_TASK_RANDOM_STATUS[i] == '5' else False
                )
                task.category.set([DEMO_TASK_RANDOM_CATEGORY[i]])
                task.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"Task with title {DEMO_TASK_RANDOM_TITLE[i]} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created task with title: {DEMO_TASK_RANDOM_TITLE[i]}"))
