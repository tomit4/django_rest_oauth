# Django REST Framework With Google OAuth2

:construction: This Repo Is NOT FINISHED, and under HEAVY CONSTRUCTION

**TODO:**

- Write this README

**How To Generate and Use Local SSL Certs On Backend:**

```sh
mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1 && \
mkcert -install
```

```sh
python manage.py runserver_plus --cert-file cert.pem --key-file key.pem
```

**RESOURCES:**

- [Article On Python Social Auth With Django REST Framework](https://scribe.rip/codex/google-sign-in-rest-api-with-python-social-auth-and-django-rest-framework-4d087cd6d47f)

- [Test Your Google Access Tokens Here](https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=TOKEN)
