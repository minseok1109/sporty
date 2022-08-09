from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'date', 'place', 'is_public', 'personnel']
    list_display_links = ['title']
    list_filter = ['created_at', 'is_public']
    search_fields = ['title']
