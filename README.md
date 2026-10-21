# GameZone API

API REST en Django para usuarios de GameZone, con login por email y JWT.

## Instalación
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env   (y poner una SECRET_KEY propia)
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Swagger: http://127.0.0.1:8000/swagger/

## Campo extra
`gamertag`: nombre de jugador del usuario. Visible en el admin, el serializer y Swagger.

## Tiempo de vida del token
ACCESS_TOKEN_LIFETIME = 30 minutos. Es lo bastante corto para limitar el daño
si un token se filtra, y lo bastante largo para no pedir login constantemente.
El refresh token dura 1 día.

## Correcciones de seguridad respecto al manual
1. El hash de la contraseña ya no aparece en ninguna respuesta (password es write_only en el serializer), incluido /auth/me/.
2. Al editar un usuario sin enviar contraseña, esta no se modifica. El manual le asignaba el hash de quien hacía la petición. Ahora la contraseña solo cambia si viene en la petición.
3. Las contraseñas se hashean con set_password dentro del serializer y se validan con los validadores de Django.
4. SECRET_KEY en .env, fuera de GitHub.
5. Swagger configurado con autenticación Bearer para probar los endpoints protegidos.