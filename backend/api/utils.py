from rest_framework.response import Response


def error(code, message, data=None):
    body = {'message': message}

    if data is not None:
        body['errors'] = data
    return Response(body, status=code)
