import re
from django.conf import settings
from django.db import models
from django.urls import reverse


class Timestampedmodel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='my_post_set',
                               on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="instagram/post/%Y/%m/%d")
    caption = models.CharField(max_length=500)
    tag_set = models.ManyToManyField('Tag', blank=True)
    location = models.CharField(max_length=100)
    bookmark_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True,
                                               related_name='bookmark_user_set')

    def __str__(self):
        return self.caption

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.caption)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])

    def is_bookmark_user(self, user):
        return self.bookmark_user_set.filter(pk=user.pk).exists()

    class Meta:
        ordering = ['-id']


class Comment(Timestampedmodel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ['-id']


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
