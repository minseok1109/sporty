
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.shortcuts import resolve_url


class User(AbstractUser):
    nickname = models.CharField(max_length=10, error_messages={
        'unique': '중복된 닉네임입니다. 다른 닉네임을 입력하세요.'})
    school = models.CharField(blank=True, max_length=10)
    avatar = models.ImageField(blank=True, upload_to="accounts/avatar/%Y/%m/%d",
                               help_text="48px * 48px 크기의 png/jpg 파일을 업로드해주세요.")

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)
