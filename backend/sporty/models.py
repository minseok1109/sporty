from django.conf import settings
from django.db import models
from django.urls import reverse


class Timestampedmodel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BasketPost(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='작성자', related_name='my_basketballpost_set',
                               on_delete=models.CASCADE)
    start_date_time = models.CharField(verbose_name='시작 날짜', max_length=50)
    location = models.CharField(verbose_name='장소', max_length=100)
    amountOfGym = models.IntegerField(verbose_name="참가비", default=0)
    level = models.CharField(verbose_name='실력', max_length=10)
    cruit = models.IntegerField(verbose_name='모집인원')
    sex = models.CharField(verbose_name="성별", default='', max_length=5)
    description = models.CharField(verbose_name='설명', max_length=100)
    questionToApplyer = models.CharField(
        verbose_name="신청자한테 궁금한 점", max_length=50, default='')
    apply_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="apply_basketpost_set"
    )

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])

    def is_apply_user(self, user):
        return self.apply_user_set.filter(pk=user.pk).exists()


class WorkPost(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='작성자', related_name='my_workpost_set',
                               on_delete=models.CASCADE)
    start_date_time = models.CharField(verbose_name='시작 날짜', max_length=50)
    location = models.CharField(verbose_name='장소', max_length=100)
    cruit = models.IntegerField(verbose_name='모집인원', null=True)
    amountOfGym = models.IntegerField(verbose_name="참가비", default=0)
    sex = models.CharField(verbose_name="성별", default='', max_length=5)
    isRunning = models.CharField(
        verbose_name='달리기 여부', default="", max_length=4)
    description = models.CharField(verbose_name='설명', max_length=100)
    questionToApplyer = models.CharField(
        verbose_name="신청자한테 궁금한 점", max_length=50, default='')
    apply_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="apply_workpost_set"
    )

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])

    def is_apply_user(self, user):
        return self.apply_user_set.filter(pk=user.pk).exists()


class FreePost(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='작성자', related_name='my_freepost_set',
                               on_delete=models.CASCADE)
    start_date_time = models.CharField(verbose_name='시작 날짜', max_length=50)
    location = models.CharField(verbose_name='장소', max_length=100)
    cruit = models.IntegerField(verbose_name='모집인원', null=True)
    amountOfGym = models.IntegerField(verbose_name="참가비", default=0)
    sex = models.CharField(verbose_name="성별", default='', max_length=5)
    description = models.CharField(verbose_name='설명', max_length=100)
    apply_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="apply_freepost_set"
    )

    def get_absolute_url(self):
        return reverse("sporty:post_detail", args=[self.pk])

    def is_apply_user(self, user):
        return self.apply_user_set.filter(pk=user.pk).exists()

class BasketComment(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(BasketPost, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["id"]

class WorkComment(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(WorkPost, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["id"]

class FreeComment(Timestampedmodel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(FreePost, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["id"]
