# Generated by Django 4.1.2 on 2022-12-07 04:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_article_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='category',
            field=models.CharField(choices=[('Politics', 'Politics'), ('Lifestyle', 'Lifestyle'), ('Sports', 'Sports'), ('Business', 'Business')], max_length=20),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
