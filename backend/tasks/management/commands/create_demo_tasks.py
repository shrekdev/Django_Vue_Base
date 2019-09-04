import random
import datetime
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from faker import Faker

from tasks.models import TaskCategory, BaseTask, TaskStatus

CustomUser = get_user_model()

fake = Faker('pl_PL')
fake.seed(4321)
random.seed(4321)


class Command(BaseCommand):
    """
    Custom django-admin command to create some TaskCategory and BaseTask objects
    """

    help = "Create BaseTask objects"
    HOW_MUCH_TASKS = 100

    def handle(self, *args, **options):

        self.stdout.write("Creating BaseTask objects...")

        random_task_category_list = [
            random.choice(TaskCategory.objects.all()) for _ in range(self.HOW_MUCH_TASKS)
        ]

        random_task_priority_list = [
            random.choice(BaseTask.CHOICES_MATRIX)[0] for _ in range(self.HOW_MUCH_TASKS)
        ]

        random_task_title_list = [
            fake.paragraph(nb_sentences=1) for _ in range(self.HOW_MUCH_TASKS)
        ]

        random_task_status_list = [
            random.choice(TaskStatus.objects.all()) for _ in range(self.HOW_MUCH_TASKS)
        ]

        tnow = timezone.now()
        random_task_created_list = [
            tnow - datetime.timedelta(days=random.randint(1, 10)) for _ in range(self.HOW_MUCH_TASKS)
        ]

        user = CustomUser.objects.filter(first_name='Rafał')[0]

        for i in range(self.HOW_MUCH_TASKS):
            try:
                task = BaseTask.objects.create(
                    created_by=user,
                    assigned_to=user,
                    title=random_task_title_list[i],
                    priority=random_task_priority_list[i],
                    status=random_task_status_list[i],
                    created=random_task_created_list[i],
                    completed=True if random_task_status_list[i] == '5' else False
                )
                task.category.set([random_task_category_list[i]])
                task.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"BaseTask with title {random_task_title_list[i]} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created BaseTask with title: {random_task_title_list[i]}"))
