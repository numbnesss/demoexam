from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from . import models, serializer
from .utils import error


class Register(APIView):
    def post(self, req):
        s = serializer.RegisterSerializer(data=req.data)
        s.is_valid(raise_exception=True)
        s.save()
        return Response({'success': True}, status=201)


class Login(APIView):
    def post(self, req):
        s = serializer.LoginSerializer(data=req.data)
        s.is_valid(raise_exception=True)
        user = authenticate(req, **s.validated_data)
        if user is None:
            return error(422, 'Invalid data', {'username': ['Неверный логин или пароль']})
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'is_staff': user.is_staff})


class Applications(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, req):
        applications = models.Applications.objects.filter(user=req.user)
        s = serializer.ApplicationSerializer(applications, many=True)
        return Response({'data': s.data})

    def post(self, req):
        s = serializer.ApplicationSerializer(data=req.data)
        s.is_valid(raise_exception=True)
        s.save(user=req.user)
        return Response({'data': s.data}, status=201)


class Review(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, pk):
        application = get_object_or_404(models.Applications, pk=pk)
        if application.user != req.user:
            raise PermissionDenied
        if application.status != 'done':
            return error(422, 'Invalid fields', {
                'review': ['Отзыв можно оставить только после завершения мероприятия']
            })
        s = serializer.ReviewSerializer(data=req.data)
        s.is_valid(raise_exception=True)
        application.review = s.validated_data['review']
        application.save()
        return Response({'data': serializer.ApplicationSerializer(application).data})


class AdminApplications(APIView):
    permission_classes = [IsAdminUser]

    def get(self, req):
        applications = models.Applications.objects.all()
        s = serializer.ApplicationSerializer(applications, many=True)
        return Response({'data': s.data})


class AdminStatus(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, req, pk):
        application = get_object_or_404(models.Applications, pk=pk)
        s = serializer.StatusSerializer(data=req.data)
        s.is_valid(raise_exception=True)
        application.status = s.validated_data['status']
        application.save()
        return Response({'data': serializer.ApplicationSerializer(application).data})
