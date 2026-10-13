from django.http import Http404
from rest_framework.exceptions import NotAuthenticated, AuthenticationFailed, PermissionDenied, ValidationError, \
    NotFound
from rest_framework.views import exception_handler

from .utils import error


def handler(exc, ctx):
    if isinstance(exc, (NotAuthenticated, AuthenticationFailed, PermissionDenied)):
        return error(403, 'Forbidden for you')
    if isinstance(exc, ValidationError):
        return error(422, 'Invalid fields', exc.detail)
    if isinstance(exc, (NotFound, Http404)):
        return error(404, 'NotFound')
    return exception_handler(exc, ctx)
