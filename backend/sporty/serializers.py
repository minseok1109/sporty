from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import BasketPost, BasketComment, WorkComment, FreeComment
from .models import WorkPost
from .models import FreePost


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id', 'username', 'avatar', 'nickname'
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

    def is_apply_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.apply_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = WorkPost
        fields = "__all__"


class FreePostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    def is_apply_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.apply_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = FreePost
        fields = "__all__"

class BasketCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = BasketComment
        fields = ["id", "author", "message", "created_at"]

class WorkCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = WorkComment
        fields = ["id", "author", "message", "created_at"]

class FreeCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = FreeComment
        fields = ["id", "author", "message", "created_at"]