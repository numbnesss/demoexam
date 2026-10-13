from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)


class Applications(models.Model):
    PAYMENTS = [
        ('cash', 'При очном посещении'),
        ('sbp', 'Перевод по СБП')
    ]

    STATUSES = [
        ('new', 'Новая'),
        ('scheduled', 'Мероприятие назначено'),
        ('done', 'Завершено')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.CharField(max_length=255)
    start_date = models.DateField()
    payment = models.CharField(choices=PAYMENTS, max_length=10)
    status = models.CharField(choices=STATUSES, max_length=10, default='new')
    review = models.TextField(blank=True)

    class Meta:
        ordering = ['-id']
