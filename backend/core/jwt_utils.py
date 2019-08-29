import jwt
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenVerifySerializer

from core import settings
from .utils import get_env_variable


def verify_jwt_token(token):
    try:
        TokenVerifySerializer().validate({"token": token})
    except TokenError as e:
        raise e
    else:
        return token


def decode_jwt_token(token):
    verified_token = verify_jwt_token(token)

    return jwt.decode(
        jwt=verified_token,
        key=settings.SECRET_KEY,
        algorithms=[get_env_variable("JWT_ALGORITHM")]
    )


def get_user_id_from_token(token):
    return decode_jwt_token(token)["user_id"]
