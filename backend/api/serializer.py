from random import choices
from datetime import date
from . import models
from rest_framework import serializers


class RegisterSerializer(serializers.Serializer):
    username = serializers.RegexField(r'^[A-Za-z0-9]{6,}$', error_messages={
        'required': 'Введите логин',
        'blank': 'Введите логин',
        'invalid': 'Логин: латиница и цифры, не менее 6 символов'
    })

    password = serializers.CharField(min_length=8, error_messages={
        'required': 'Введите пароль',
        'blank': 'Введите пароль',
        'min_length': 'Пароль: минимум 8 символов'
    })

    full_name = serializers.RegexField(r'^[А-Яа-яЁё ]+$', error_messages={
        'required': 'Введите ФИО',
        'blank': 'Введите ФИО',
        'invalid': 'ФИО: только кириллица и пробелы'
    })

    phone = serializers.RegexField(r'^8\(\d{3}\)\d{3}-\d{2}-\d{2}$', error_messages={
        'required': 'Введите телефон',
        'blank': 'Введите телефон',
        'invalid': 'Телефон в формате 8(XXX)XXX-XX-XX'
    })

    email = serializers.EmailField(error_messages={
        'required': 'Введите почту',
        'blank': 'Введите почту',
        'invalid': 'Неккоректная почта'
    })

    def validate_username(self, value):
        if models.User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Этот логин уже занят')
        return value

    def create(self, data):
        return models.User.objects.create_user(**data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(error_messages={
        'required': 'Введите логин',
        'blank': 'Введите логин'
    })

    password = serializers.CharField(error_messages={
        'required': 'Введите пароль',
        'blank': 'Введите пароль'
    })


class ApplicationSerializer(serializers.ModelSerializer):
    room = serializers.CharField(max_length=255, error_messages={
        'required': 'Введите помещение',
        'blank': 'Введите помещение'
    })

    start_date = serializers.DateField(format='%d.%m.%Y', input_formats=['%d.%m.%Y', '%Y-%m-%d'], error_messages={
        'required': 'Введите дату в формате ДД.ММ.ГГГГ',
        'invalid': 'Введите дату в формате ДД.ММ.ГГГГ',
    })

    payment = serializers.ChoiceField(choices=models.Applications.PAYMENTS, error_messages={
        'required': 'Выберите способ оплаты',
        'invalid_choice': 'Выберите способ оплаты'
    })

    payment_display = serializers.CharField(source='get_payment_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    user = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = models.Applications
        fields = ['id', 'user', 'room', 'start_date', 'payment', 'payment_display', 'status', 'status_display', 'review']
        read_only_fields = ['status', 'review']

    def validate_start_date(self, value):
        if value < date.today():
            raise serializers.ValidationError('Дата не может быть в прошлом')
        return value


class ReviewSerializer(serializers.Serializer):
    review = serializers.CharField(error_messages={
        'required': 'Введите отзыв',
        'blank': 'Введите отзыв'
    })


class StatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['scheduled', 'done'], error_messages={
        'required': 'Выберите статус',
        'invalid_choices': 'Выберите статус'
    })
