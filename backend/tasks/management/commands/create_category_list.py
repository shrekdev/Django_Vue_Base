from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from tasks.models import TaskCategory


class Command(BaseCommand):
    """
    Custom django-admin command to create some TaskCategory objects
    """

    help = "Create TaskCategory and BaseTask objects"

    def handle(self, *args, **options):

        self.stdout.write("Creating TaskCategory objects...")

        category_settings = [
            ("Dom", "#FF00FF"), ("Praca", "#808000"), ("Wakacje", "#008080"), ("Zakupy", "#C0C0C0")
        ]

        for name, color in category_settings:
            try:
                category = TaskCategory.objects.create(
                    name=name,
                    color=color,
                )
                category.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"TaskCategory {name} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created TaskCategory: {name}"))
