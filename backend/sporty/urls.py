from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include
from django.conf import settings


router = DefaultRouter()
router.register('basketposts', views.BasketPostViewSet)
router.register('workposts', views.WorkPostViewSet)
router.register('freeposts', views.FreePostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path(r'^__debug__/', include(debug_toolbar.urls)),
    ]
