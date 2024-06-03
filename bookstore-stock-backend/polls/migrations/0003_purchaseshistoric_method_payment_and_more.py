# Generated by Django 5.0.6 on 2024-05-31 02:48

import datetime
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_purchaseshistoric_quantity_alter_customer_birth_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseshistoric',
            name='method_payment',
            field=models.CharField(default='', max_length=60),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customer',
            name='birth_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='modelbase',
            name='change_date',
            field=models.DateField(default=datetime.datetime(2024, 5, 30, 23, 48, 21, 542102)),
        ),
        migrations.AlterField(
            model_name='modelbase',
            name='inclusion_date',
            field=models.DateField(default=datetime.datetime(2024, 5, 30, 23, 48, 21, 542102)),
        ),
        migrations.AlterField(
            model_name='purchaseshistoric',
            name='purchase_date',
            field=models.DateField(default=datetime.datetime(2024, 5, 30, 23, 48, 21, 564151)),
        ),
    ]