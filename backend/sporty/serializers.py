from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import BasketPost
from .models import WorkPost
from .models import FreePost


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id', 'username', 'avatar','nickname'
        ]


class BasketPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_apply = serializers.SerializerMethodField("is_apply_field")

    def is_apply_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.apply_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = BasketPost
        fields = "__all__"

class WorkPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = WorkPost
        fields = ["id", "author", "created_at", "title", "date", "location", "cruit", "purpose", "description", "apply_user_set", "is_apply"]

class FreePostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = FreePost
        fields = ["id", "author", "created_at", "title", "date", "location", "cruit", "description", "apply_user_set", "is_apply"]
