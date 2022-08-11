from django.db import models
from django.urls import reverse
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_public = models.BooleanField(default=False, verbose_name='공개여부')
    title = models.CharField(max_length=50, verbose_name='제목')
    content = models.TextField(max_length=200)
    date = models.DateField(verbose_name='만나는 날짜')
    personnel = models.PositiveIntegerField(verbose_name='모집인원')
    place = models.CharField(max_length=50, verbose_name='장소')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    photo = models.ImageField(blank=True, upload_to='post/%Y/%m/%d')


    def __str__(self):
        return self.title

    
    def get_absolute_url(self):
        return reverse('apply:post_detail', args=[self.pk])


    class Meta:
        ordering = ['id']