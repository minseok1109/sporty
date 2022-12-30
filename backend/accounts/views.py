from django.db.models import Q
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import SignupSerializer, UserSerializer, ChatDataSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,
    ]


class UserViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class UserSelfData(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = ChatDataSerializer

    def get_self_data(self):
        qs = super().get_queryset()
        qs = qs.filter(
            Q(username=self.request.user.username)
        )
        return qs