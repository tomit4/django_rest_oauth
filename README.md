# Django REST Framework With Google OAuth2

:construction: This Repo Is NOT FINISHED, and under HEAVY CONSTRUCTION

**NOTE:**

We don't necessarily have to set the cookie, but we DO need to set some kind of
hash on the access_token and store that on the client. Once we send this hash to
our backend, we match it with the hashes of our cached access_tokens, then
sending the unhashed access tokens off to google to verify via Python Social
Auth. If the user is authenticated, and their expiration is not too close, then
we simply send then we don't redirect them back to Home Page.

If the user is not authenticated, we use the refresh token to see if we can
issue a new access token. If we can we do, and if we don't, they are logged out.

**TODO:**

- Write this README

```sh
mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1 && \
mkcert -install
```

```sh
python manage.py runserver_plus --cert-file cert.pem --key-file key.pem
```
