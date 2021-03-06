# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-21 23:09
from __future__ import unicode_literals

from django.db import migrations, models


def add_letters(apps, schema_editor):
    Choice = apps.get_model('poll', 'Choice')
    db_alias = schema_editor.connection.alias
    l = ["A", "B", "C", "D"]
    for c in Choice.objects.using(db_alias).all():
        c.option = l[(c.id - 1) % 4]
        c.save()

class Migration(migrations.Migration):

    dependencies = [
        ('poll', '0003_session_date_submitted'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='option',
            field=models.CharField(default='X', max_length=2),
        ),
        migrations.RunPython(add_letters)
    ]
