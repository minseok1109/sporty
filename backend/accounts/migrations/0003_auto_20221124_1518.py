# Generated by Django 3.2.4 on 2022-11-24 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20221029_0657'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='user',
            name='school',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]