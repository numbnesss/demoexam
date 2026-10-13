from django.contrib.auth.hashers import make_password

from django.db import migrations


def create_admin(apps, schema_editor):
    apps.get_model('api', 'User').objects.create(
        username='Conf2027',
        password=make_password('Demo77'),
        is_staff=True
    )


class Migration(migrations.Migration):
    dependencies = [('api', '0001_initial')]
    operations = [migrations.RunPython(create_admin)]
