# Generated by Django 5.0.3 on 2024-03-19 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_userprofile_photo_delete_userprofilephoto'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='about',
            field=models.TextField(default='', max_length=500),
        ),
    ]
