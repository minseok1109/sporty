from django.conf import settings
from django.db import models
from django.urls import reverse

class Timestampedmodel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class BasketPost(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL,verbose_name='작성자', related_name='my_basketballpost_set',
                               on_delete=models.CASCADE)
    title = models.CharField(verbose_name='제목', max_length=50, null=True)
    date = models.CharField(verbose_name='날짜' ,max_length=50)
    location = models.CharField(verbose_name='장소' ,max_length=100)
    level = models.CharField(verbose_name='실력', max_length=10)
    cruit = models.IntegerField(verbose_name='모집인원', null=True)
    gameinfo = models.CharField(verbose_name='경기정보', max_length=20)
    description = models.CharField(verbose_name='설명', max_length=100)

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])

class WorkPost(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='작성자', related_name='my_workpost_set',
                               on_delete=models.CASCADE)
    title = models.CharField(verbose_name='제목', max_length=50, null=True)
    date = models.CharField(verbose_name='날짜', max_length=50)
    location = models.CharField(verbose_name='장소', max_length=100)
    purpose = models.CharField(verbose_name='목표거리', max_length=10)
    cruit = models.IntegerField(verbose_name='모집인원', null=True)
    description = models.CharField(verbose_name='설명', max_length=100)

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])

class FreePost(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='작성자', related_name='my_freepost_set',
                               on_delete=models.CASCADE)
    title = models.CharField(verbose_name='제목', max_length=50, null=True)
    date = models.CharField(verbose_name='날짜', max_length=50)
    location = models.CharField(verbose_name='장소', max_length=100)
    cruit = models.IntegerField(verbose_name='모집인원', null=True)
    description = models.CharField(verbose_name='설명', max_length=100)

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])