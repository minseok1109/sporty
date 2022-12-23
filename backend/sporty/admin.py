from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import BasketPost
from .models import WorkPost
from .models import FreePost


@admin.register(BasketPost)
class BasketPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'start_date_time','end_date_time', 'location', 'level', 'cruit', 'gameinfo', 'description']

@admin.register(WorkPost)
class WorkPostAdmin(admin.ModelAdmin):
    list_display = ['title', "date", 'location', 'purpose', 'cruit', 'description']

@admin.register(FreePost)
class FreePostAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'cruit', 'description']
