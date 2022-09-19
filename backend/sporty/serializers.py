from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id', 'username', 'name'
        ]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
