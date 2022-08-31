# Generated by Django 2.1.2 on 2022-08-04 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_public', models.BooleanField(default=False, verbose_name='공개여부')),
                ('title', models.CharField(max_length=50, verbose_name='제목')),
                ('content', models.TextField(max_length=200)),
                ('date', models.DateField(verbose_name='만나는 날짜')),
                ('personnel', models.PositiveIntegerField(verbose_name='모집인원')),
                ('place', models.CharField(max_length=50, verbose_name='장소')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('photo', models.ImageField(blank=True, upload_to='post/%Y/%m/%d')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]