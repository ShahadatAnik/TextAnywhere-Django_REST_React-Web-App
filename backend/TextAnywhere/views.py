from rest_framework import viewsets
from .models import UserInfo, UserTab
from .serializers import UserInfoSerializer, UserTabSerializer


class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
    lookup_field = 'userName'


class UserTabViewSet(viewsets.ModelViewSet):
    queryset = UserTab.objects.all()
    serializer_class = UserTabSerializer
