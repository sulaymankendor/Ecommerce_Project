# Generated by Django 4.0.2 on 2023-03-03 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_app', '0015_remove_cart_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='image',
            field=models.ImageField(default='1', max_length=1000, upload_to='cart_product_images'),
            preserve_default=False,
        ),
    ]
