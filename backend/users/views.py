# TODO: For README later, this was achieved thanks to:
#  https://scribe.rip/codex/google-sign-in-rest-api-with-python-social-auth-and-django-rest-framework-4d087cd6d47f
# TODO: You can test google oauth access tokens by pasting them here:
# Add that to README
#  https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=TOKEN

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

import requests
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings
from social_django.utils import psa
from requests.exceptions import HTTPError


# NOTE: Currently somewhat of a hack using requests,
# there is probably a better way using the social_auth.core
@api_view(['POST'])
@permission_classes([AllowAny])
@psa()
def register_by_access_token(request, backend):
    code = request.data.get('code')
    if not code:
        return Response({'error': 'No code provided.'},
                        status=status.HTTP_400_BAD_REQUEST)
    try:
        token_url = 'https://www.googleapis.com/oauth2/v4/token'
        data = {
            'code': code,
            'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
            'redirect_uri': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_REDIRECT_URI,
            'grant_type': 'authorization_code'
        }

        response = requests.post(token_url, data=data)

        if response.status_code != 200:
            return Response({'error': 'Failed to get tokens from Google.'},
                            status=response.status_code)

        tokens = response.json()
        access_token = tokens.get('access_token')
        # TODO: refresh_token should be set in key/value store (i.e. cache)
        # and used to grab new access_token when access_token is expired
        # TODO: refresh_token could not exist, handle exception
        refresh_token = tokens.get('refresh_token')
        # TODO: certain user info should be stored/hashed in DB on sign up
        # and used for other services
        user = request.backend.do_auth(access_token)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            res = Response(
                # TODO: access_token should be sent back to client as http only cookie
                {'token': token.key},
                status=status.HTTP_200_OK,
            )
            # Sends a secure cookie, doesn't work without https
            # you can see it in the Network Tab of the devtools though
            res.set_cookie(
                'access_token',
                token.key,
                httponly=True,
                samesite="None",
                secure="True",
            )
            return res
        else:
            return Response(
                {'errors': {
                    'code': 'Invalid Authentication Code'
                }},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Exception as e:
        return Response({'error': str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# NOTE: As long as authorization returns 200, user is authenticated
# TODO: redirect to get new access_token if access_token is expired via refresh_token
@api_view(['GET', 'POST'])
def authentication_test(request):
    #  print(request.user)
    return Response(
        {'message': "User successfully authenticated"},
        status=status.HTTP_200_OK,
    )
