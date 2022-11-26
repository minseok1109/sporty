
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
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




class WorkPostViewSet(ModelViewSet):
    queryset = WorkPost.objects.all().select_related(
        "author")
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



class FreePostViewSet(ModelViewSet):
    queryset = FreePost.objects.all().select_related(
        "author")
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