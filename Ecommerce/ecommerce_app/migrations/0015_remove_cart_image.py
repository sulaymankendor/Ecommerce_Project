# Generated by Django 4.0.2 on 2023-03-03 12:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_app', '0014_cart_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='image',
        ),
    ]