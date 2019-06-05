from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from ._literals import *

CustomUser = get_user_model()


class Command(BaseCommand):
    """
    Custom django-admin command to create demo users
    """

    help = "Create demo users"

    def handle(self, *args, **options):

        for i in range(HOW_MUCH_DEMO_USERS):
            try:
                user = CustomUser.objects.create_user(
                    first_name=DEMO_USER_FIRST_NAME[i],
                    email=DEMO_USER_EMAIL[i],
                    password=DEMO_USER_PASSWORD,
                    is_active=True,
                    is_staff=False,
                )
                user.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"User {DEMO_USER_FIRST_NAME[i]} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created user: {DEMO_USER_FIRST_NAME[i]}"))
