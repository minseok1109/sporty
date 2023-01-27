from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import BasketPost, BasketComment, WorkComment, FreeComment
from .serializers import BasketPostSerializer, BasketCommentSerializer, WorkCommentSerializer, FreeCommentSerializer
from .models import WorkPost
from .serializers import WorkPostSerializer
from .models import FreePost
from .serializers import FreePostSerializer


class BasketPostViewSet(ModelViewSet):
    queryset = BasketPost.objects.all().select_related(
        "author").order_by('-created_at')
    serializer_class = BasketPostSerializer
    # authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [AllowAny]  # FIXME 인증 적용

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])
    def apply(self, request, pk):
        post = self.get_object()
        post.apply_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @apply.mapping.delete
    def disapply(self, request, pk):
        post = self.get_object()
        post.apply_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class SelfBasketPost(BasketPostViewSet):
    queryset = BasketPost.objects.all()
    serializer_class = BasketPostSerializer

    def get_queryset(self):
        qs = super(BasketPostViewSet, self).get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)
        )
        return qs

class ApplyBasketPost(BasketPostViewSet):
    queryset = BasketPost.objects.all()
    serializer_class = BasketPostSerializer

    def get_queryset(self):
        qs = super(BasketPostViewSet, self).get_queryset()
        qs = qs.filter(
            Q(apply_user_set=self.request.user)
        )
        return qs


class WorkPostViewSet(ModelViewSet):
    queryset = WorkPost.objects.all().select_related(
        "author").order_by('-created_at')
    serializer_class = WorkPostSerializer
    permission_classes = [AllowAny]  # FIXME 인증 적용

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])
    def apply(self, request, pk):
        post = self.get_object()
        post.apply_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @apply.mapping.delete
    def disapply(self, request, pk):
        post = self.get_object()
        post.apply_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class SelfWorkPost(WorkPostViewSet):
    queryset = WorkPost.objects.all()
    serializer_class = WorkPostSerializer

    def get_queryset(self):
        qs = super(WorkPostViewSet, self).get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)
        )
        return qs

class ApplyWorkPost(WorkPostViewSet):
    queryset = WorkPost.objects.all()
    serializer_class = WorkPostSerializer

    def get_queryset(self):
        qs = super(WorkPostViewSet, self).get_queryset()
        qs = qs.filter(
            Q(apply_user_set=self.request.user)
        )
        return qs


class FreePostViewSet(ModelViewSet):
    queryset = FreePost.objects.all().select_related(
        "author").order_by('-created_at')
    serializer_class = FreePostSerializer
    permission_classes = [AllowAny]  # FIXME 인증 적용

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])
    def apply(self, request, pk):
        post = self.get_object()
        post.apply_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @apply.mapping.delete
    def disapply(self, request, pk):
        post = self.get_object()
        post.apply_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class SelfFreePost(FreePostViewSet):
    queryset = FreePost.objects.all()
    serializer_class = FreePostSerializer

    def get_queryset(self):
        qs = super(FreePostViewSet, self).get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)
        )
        return qs

class ApplyFreePost(FreePostViewSet):
    queryset = FreePost.objects.all()
    serializer_class = FreePostSerializer

    def get_queryset(self):
        qs = super(FreePostViewSet, self).get_queryset()
        qs = qs.filter(
            Q(apply_user_set=self.request.user)
        )
        return qs

class BasketCommentViewSet(ModelViewSet):
    queryset = BasketComment.objects.all()
    serializer_class = BasketCommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(BasketPost, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)

class WorkCommentViewSet(ModelViewSet):
    queryset = WorkComment.objects.all()
    serializer_class = WorkCommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(BasketPost, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)

class FreeCommentViewSet(ModelViewSet):
    queryset = FreeComment.objects.all()
    serializer_class = FreeCommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(BasketPost, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)