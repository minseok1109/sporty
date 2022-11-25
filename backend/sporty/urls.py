from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()
router.register('basketposts', views.BasketPostViewSet)
router.register('workposts', views.WorkPostViewSet)
router.register('freeposts', views.FreePostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
