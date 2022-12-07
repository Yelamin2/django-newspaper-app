# Generated by Django 4.1.2 on 2022-12-07 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_article_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Politics', 'Politics'), ('Lifestyle', 'Lifestyle'), ('Sports', 'Sports'), ('Business', 'Business')], max_length=20)),
            ],
        ),
    ]
