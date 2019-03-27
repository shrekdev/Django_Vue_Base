from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUserManager(UserManager):
    """
    CustomUserManager provide possibility to log in both with username and email address
    """

    def get_by_natural_key(self, username):
        return self.get(
            models.Q(**{self.model.USERNAME_FIELD: username}) |
            models.Q(**{self.model.EMAIL_FIELD: username})
        )


class CustomUser(AbstractUser):
    """
    CustomUser model with e-mail and first_name fields required and with CustomUserManager
    """

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'email']

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
