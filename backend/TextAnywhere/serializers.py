from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import UserInfo, UserTab


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'


class UserTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTab
        fields = '__all__'
