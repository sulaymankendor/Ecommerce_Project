# Generated by Django 4.0.2 on 2023-02-13 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_app', '0002_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='image',
            field=models.ImageField(max_length=1000, upload_to='cart_product_images'),
        ),
    ]