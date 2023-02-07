from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include
from django.conf import settings


router = DefaultRouter()
router.register('basketposts', views.BasketPostViewSet)
router.register('workposts', views.WorkPostViewSet)
router.register('freeposts', views.FreePostViewSet)
# 내가 작성한 글
router.register('selfbasketposts', views.SelfBasketPost)
router.register('selfworkposts', views.SelfWorkPost)
router.register('selffreeposts', views.SelfFreePost)
# 신청한 글
router.register('applybasketposts', views.ApplyBasketPost)
router.register('applyworkposts', views.ApplyWorkPost)
router.register('applyFreeposts', views.ApplyFreePost)
# 댓글
router.register(r"basketposts/(?P<post_pk>\d+)/comments",
                views.BasketCommentViewSet)
router.register(r"workposts/(?P<post_pk>\d+)/comments",
                views.WorkCommentViewSet)
router.register(r"freeposts/(?P<post_pk>\d+)/comments",
                views.FreeCommentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
