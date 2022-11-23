from datetime import timedelta

from django.db.models import Q
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().select_related(
        "author")
    serializer_class = PostSerializer
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