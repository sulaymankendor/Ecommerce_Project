# Generated by Django 4.0.2 on 2023-02-25 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_app', '0005_alter_cart_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='number_of_item',
            field=models.IntegerField(default='1'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cart',
            name='total_item_price',
            field=models.DecimalField(decimal_places=2, default='1', max_digits=4),
            preserve_default=False,
        ),
    ]
