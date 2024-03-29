from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import BasketPost, BasketComment, WorkComment, FreeComment
from .models import WorkPost
from .models import FreePost


@admin.register(BasketPost)
class BasketPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'start_date_time',
                    'location', 'level', 'cruit', 'sex', 'questionToApplyer', 'amountOfGym', 'description']


@admin.register(WorkPost)
class WorkPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'start_date_time', 'location',
                    'isRunning', 'cruit', 'amountOfGym', 'sex', 'description', 'questionToApplyer']


@admin.register(FreePost)
class FreePostAdmin(admin.ModelAdmin):
    list_display = ['id', 'start_date_time',
                    'location', 'cruit', 'amountOfGym', 'sex', 'description']


@admin.register(BasketComment)
class BasketCommentAdmin(admin.ModelAdmin):
    list_display = ['id',
                    'created_at',
                    'updated_at',
                    'message',
                    'author',
                    'post']


@admin.register(WorkComment)
class WorkCommentAdmin(admin.ModelAdmin):
    list_display = ['id',
                    'created_at',
                    'updated_at',
                    'message',
                    'author',
                    'post']


@admin.register(FreeComment)
class FreeCommentAdmin(admin.ModelAdmin):
    list_display = ['id',
                    'created_at',
                    'updated_at',
                    'message',
                    'author',
                    'post']
