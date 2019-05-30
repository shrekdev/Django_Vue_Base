import pytest
from users import models


def test_custom_user_model_attributes():
    assert models.CustomUser.username is None
    assert models.CustomUser.USERNAME_FIELD == "email"
    assert models.CustomUser.EMAIL_FIELD == "email"
    assert models.CustomUser.REQUIRED_FIELDS == []


def test_custom_user_create_user(db):
    custom_user = models.CustomUser.objects.create_user(
        first_name="user",
        email="user@user.com",
        password="password"
    )

    assert str(custom_user) == "user"
    assert custom_user.first_name == "user"
    assert custom_user.email == "user@user.com"
    assert custom_user.is_staff is False
    assert custom_user.is_superuser is False


def test_custom_user_create_user_failure(db):
    with pytest.raises(ValueError):
        models.CustomUser.objects.create_user(
            first_name="user",
            email="",
            password="password"
        )


def test_custom_user_create_superuser(db):
    custom_super_user = models.CustomUser.objects.create_superuser(
        first_name="superuser",
        email="superuser@superuser.com",
        password="password"
    )

    assert str(custom_super_user) == "superuser"
    assert custom_super_user.first_name == "superuser"
    assert custom_super_user.email == "superuser@superuser.com"
    assert custom_super_user.is_staff is True
    assert custom_super_user.is_superuser is True


def test_custom_user_create_superuser_is_staff_failure(db):
    with pytest.raises(ValueError):
        models.CustomUser.objects.create_superuser(
            first_name="superuser",
            email="superuser@superuser.com",
            password="password",
            is_staff=False,
            is_superuser=True,
        )


def test_custom_user_create_superuser_is_superuser_failure(db):
    with pytest.raises(ValueError):
        models.CustomUser.objects.create_superuser(
            first_name="superuser",
            email="superuser@superuser.com",
            password="password",
            is_staff=True,
            is_superuser=False,
        )
