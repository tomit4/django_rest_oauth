# TODO: For README later, this was achieved thanks to:
#  https://scribe.rip/codex/google-sign-in-rest-api-with-python-social-auth-and-django-rest-framework-4d087cd6d47f
# TODO: You can test google oauth access tokens by pasting them here:
# Add that to README
#  https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=TOKEN

# TODO: In order to accomplish utilizing the refresh token,
# we might want to consider removing the @psa() macro and
# rewriting our logic so we MIGHT have more access to the
# overall python social auth API

# TODO: We also need to integrate Django's Native Authentication as seen here:
# https://python-social-auth.readthedocs.io/en/latest/use_cases.html#pass-custom-get-post-parameters-and-retrieve-them-on-authentication#signup-by-oauth-access-token
# https://realpython.com/adding-social-authentication-to-django/

# e.g.
# from django.contrib.auth import login
# if user:
#     login(request, user) ...

# NOTE: And then do "something" via native Django to implement login...maybe?
# NOTE: Django's auth system DOES currently work with this base file,
# so maybe this isn't necessary...

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from social_django.utils import psa

from requests.exceptions import HTTPError


@api_view(['POST'])
@permission_classes([AllowAny])
@psa()
def register_by_access_token(request, backend):
    token = request.data.get('access_token')
    user = request.backend.do_auth(token)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {'token': token.key},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {'errors': {
                'token': 'Invalid token'
            }},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(['GET', 'POST'])
def authentication_test(request):
    #  print(request.user)
    return Response(
        {'message': "User successfully authenticated"},
        status=status.HTTP_200_OK,
    )
