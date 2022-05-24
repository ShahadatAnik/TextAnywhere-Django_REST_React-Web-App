from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter

from .views import UserInfoViewSet, UserTabViewSet


router = DefaultRouter()
router.register('info', UserInfoViewSet, basename='user-info')
router.register('tab', UserTabViewSet, basename='user-tab')

urlpatterns = [
    path('ta/', include(router.urls)),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
