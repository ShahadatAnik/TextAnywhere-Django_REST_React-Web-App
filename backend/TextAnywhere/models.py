from django.db import models


# Create your models here.

class UserInfo(models.Model):
    userName = models.CharField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=100, null=False)

    Updated = models.DateTimeField(auto_now=True)
    Created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['userName']

    def __str__(self):
        return self.userName or ''


class UserTab(models.Model):
    userName = models.CharField(max_length=100, null=False)
    tabName = models.CharField(max_length=100, default="Empty Tab", null=False)
    tabDesc = models.CharField(max_length=100, default="", null=False)

    Updated = models.DateTimeField(auto_now=True)
    Created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['userName']

    def __str__(self):
        return self.userName or ''
