from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from ._literals import *


class Command(BaseCommand):
    """
    Custom django-admin command to create some TaskCategory objects
    """

    help = "Create TaskCategory objects"

    def handle(self, *args, **options):

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
