from django.contrib.auth import get_user_model

import random
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from faker import Faker

from tasks.models import BaseTask, TaskCategory
CustomUser = get_user_model()

fake = Faker('pl_PL')
fake.seed(4321)
random.seed(4321)


class Command(BaseCommand):
    """
    Custom django-admin command to create some BaseTask objects
    """

    help = "Create seven TaskCategory objects"

    def handle(self, *args, **options):
        _HOW_MUCH_TASKS = 10
        random_title = ""

        for _ in range(_HOW_MUCH_TASKS):
            try:
                random_user = random.choice(CustomUser.objects.all())
                random_category = random.choice(TaskCategory.objects.all())
                random_title = fake.text(max_nb_chars=100)
                print(random_category)
                task = BaseTask.objects.create(
                    created_by=random_user,
                    assigned_to=random_user,
                    title=random_title,
                    priority=random.choice(BaseTask.CHOICES_MATRIX)[0],
                    status=random.choice(BaseTask.TASK_STATUSES)[0],
                )
                task.category.set([random_category])
                task.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"Task {random_title[:30]}[...] already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created task: {random_title[:15]} [...]"))
