from djoser.serializers import UserCreateSerializer
from .models import CustomUser


class CustomUserRegistrationSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('first_name', 'username', 'email', 'password')
