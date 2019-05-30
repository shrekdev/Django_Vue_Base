from django.contrib.auth.models import AbstractUser, UserManager, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUserManager(UserManager):
    """
    CustomUserManager provide possibility to login both with username and email address
    """

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """

        if not email:
            raise ValueError('The e-mail address must be set!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    CustomUser model with e-mail and first_name fields required and with CustomUserManager
    """

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    # to register and login only by e-mail
    username = None

    first_name = models.CharField(
        verbose_name=_('first name'),
        max_length=30
    )

    email = models.EmailField(
        verbose_name=_('e-mail address'),
        max_length=254,
        unique=True,
        db_index=True,
        error_messages={
            'unique': _("A user with that e-mail address already exists."),
        },
    )

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.first_name}'
