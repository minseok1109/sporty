from django import forms
from .models import Post
import re


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'photo', 'date', 'personnel', 'place']
        # exclude = []
