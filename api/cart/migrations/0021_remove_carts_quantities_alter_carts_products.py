# Generated by Django 4.1.7 on 2023-04-07 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0020_remove_carts_img_remove_carts_price_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carts',
            name='quantities',
        ),
        migrations.AlterField(
            model_name='carts',
            name='products',
            field=models.ManyToManyField(to='cart.products'),
        ),
    ]
