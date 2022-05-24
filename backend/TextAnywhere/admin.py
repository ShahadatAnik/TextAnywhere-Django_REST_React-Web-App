from django.contrib import admin
from .models import UserInfo, UserTab


@admin.register(UserInfo)
class UserInfoModel(admin.ModelAdmin):
    list_filter = ('id', 'userName',)
    list_display = ('id', 'userName',)


@admin.register(UserTab)
class UserTabModel(admin.ModelAdmin):
    list_filter = ('id', 'userName',)
    list_display = ('id', 'userName', 'tabName')
