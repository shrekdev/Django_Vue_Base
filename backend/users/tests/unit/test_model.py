from users import models


def test_custom_user_object_save(db):
    custom_user = models.CustomUser.objects.create_user(
        first_name="test_user_1",
        email="test_user@test_mail.com",
        password="secret@password123"
    )

    assert custom_user.first_name == "test_user_1"
    assert custom_user.email == "test_user@test_mail.com"
    assert custom_user.username is None
    assert custom_user.USERNAME_FIELD == "email"
    assert custom_user.EMAIL_FIELD == "email"
    assert custom_user.REQUIRED_FIELDS == []
