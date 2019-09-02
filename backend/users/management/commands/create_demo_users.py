from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError


CustomUser = get_user_model()


class Command(BaseCommand):
    """
    Custom django-admin command to create demo users
    """

    help = "Create demo users"

    def handle(self, *args, **options):

        user_settings = [
            ("Rafał", "rafal@mail.com"), ("Kasia", "kasia@mail.com")
        ]

        for first_name, email in user_settings:
            try:
                user = CustomUser.objects.create_user(
                    first_name=first_name,
                    email=email,
                    password="password",
                    is_active=True,
                    is_staff=False,
                )
                user.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"User {first_name} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created user: {first_name}"))
