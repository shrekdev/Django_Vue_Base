from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError


CustomUser = get_user_model()


class Command(BaseCommand):
    """
    Custom django-admin command to create demo users
    """

    help = "Create five demo users"

    def handle(self, *args, **options):
        _DEFAULT_USER_PASSWORD = "password123"

        demo_users = [
            {
                "first_name": "John",
                "email": "john@john.com",
                "password": _DEFAULT_USER_PASSWORD,
                "is_active": True,
                "is_staff": False,
            },
            {
                "first_name": "Mary",
                "email": "mary@mary.com",
                "password": _DEFAULT_USER_PASSWORD,
                "is_active": True,
                "is_staff": False,
            },
            {
                "first_name": "Margaret",
                "email": "margaret@margaret.com",
                "password": _DEFAULT_USER_PASSWORD,
                "is_active": True,
                "is_staff": False,
            },
            {
                "first_name": "David",
                "email": "david@david.com",
                "password": _DEFAULT_USER_PASSWORD,
                "is_active": True,
                "is_staff": False,
            },
            {
                "first_name": "Karen",
                "email": "karen@karen.com",
                "password": _DEFAULT_USER_PASSWORD,
                "is_active": True,
                "is_staff": False,
            },
        ]

        for user in demo_users:
            try:
                new_user = CustomUser.objects.create_user(
                    first_name=user["first_name"],
                    email=user["email"],
                    password=user["password"],
                    is_active=user["is_active"],
                    is_staff=user["is_staff"],
                )
                new_user.save()
            except IntegrityError:
                self.stderr.write(self.style.ERROR(f"User {user['first_name']} already exist!"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Successfully created user: {user['first_name']}"))
