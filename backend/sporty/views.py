from datetime import timedelta

from django.db.models import Q
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import BasketPost
from .serializers import BasketPostSerializer
from .models import WorkPost
from .serializers import WorkPostSerializer
from .models import FreePost
from .serializers import FreePostSerializer


class BasketPostViewSet(ModelViewSet):
    queryset = BasketPost.objects.all().select_related(
        "author")
    serializer_class = BasketPostSerializer
    permission_classes = [AllowAny]  # FIXME 인증 적용

    # 회원 여부 체크 부분
    # def get_queryset(self):
    #     timesince = timezone.now() - timedelta(days=3)
    #     qs = super().get_queryset()
    #     qs = qs.filter(
    #         Q(author=self.request.user)
    #         | Q(author__in=self.request.user.following_set.all())
    #     )
    #     qs = qs.filter(created_at__gte=timesince)
    #     return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

class WorkPostViewSet(ModelViewSet):
    queryset = WorkPost.objects.all().select_related(
        "author")
    serializer_class = WorkPostSerializer
    permission_classes = [AllowAny]  # FIXME 인증 적용

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

class FreePostViewSet(ModelViewSet):
    queryset = FreePost.objects.all().select_related(
        "author")
    serializer_class = FreePostSerializer
    permission_classes = [AllowAny]  # FIXME 인증 적용

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)