from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import BasketPost
from .models import WorkPost
from .models import FreePost


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id', 'username', 'name'
        ]


class BasketPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = BasketPost
        fields = "__all__"

class WorkPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = WorkPost
        fields = "__all__"

class FreePostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = FreePost
        fields = "__all__"
