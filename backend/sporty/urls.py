from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include
from django.conf import settings


router = DefaultRouter()
router.register('basketposts', views.BasketPostViewSet)
router.register('workposts', views.WorkPostViewSet)
router.register('freeposts', views.FreePostViewSet)
router.register('selfbasketposts', views.SelfBasketPost)
router.register('selfworkposts', views.SelfWorkPost)
router.register('selffreeposts', views.SelfFreePost)

urlpatterns = [
    path('api/', include(router.urls)),
]
