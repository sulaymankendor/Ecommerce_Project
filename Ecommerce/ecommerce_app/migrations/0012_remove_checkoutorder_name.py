# Generated by Django 4.0.2 on 2023-02-27 14:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_app', '0011_alter_checkoutorder_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checkoutorder',
            name='name',
        ),
    ]
