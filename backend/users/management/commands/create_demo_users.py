from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from faker import Faker


CustomUser = get_user_model()
fake = Faker('pl_PL')
fake.seed(4321)


class Command(BaseCommand):
    """
    Custom django-admin command to create demo users
    """

    help = "Create ten demo users"

    def handle(self, *args, **options):
        _DEFAULT_USER_PASSWORD = "password123"
        _HOW_MUCH_DEMO_USERS = 10

        for _ in range(_HOW_MUCH_DEMO_USERS):
            try:
                user = CustomUser.objects.create_user(
                    first_name=fake.first_name(),
                    email=fake.email(),
                    password=_DEFAULT_USER_PASSWORD,
                    is_active=True,
                    is_staff=False,
                )
                user.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"User {fake.first_name()} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created user: {fake.first_name()}"))
