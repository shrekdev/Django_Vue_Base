from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from tasks.models import TaskStatus


class Command(BaseCommand):
    """
    Custom django-admin command to create TaskStatus objects
    """

    help = "Create TaskStatus objects"

    def handle(self, *args, **options):

        status_settings = [
            ("New", "#FFD700"), ("In Progress", "#00FF00"), ("Suspended", "#FF4500"), ("Completed", "#008000")
        ]

        for status_name, status_color in status_settings:
            try:
                status = TaskStatus.objects.create(
                    name=status_name,
                    color=status_color,
                )
                status.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"TaskStatus {status_name} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created TaskStatus: {status_name}"))
