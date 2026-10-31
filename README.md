# Resultado de Aprendizaje Unidad 2 y 3: Django + React con Autenticación y APIs

Proyecto GameZone. Backend en Django REST (usuarios con email, JWT, registro y
consumo de un servicio SOAP con zeep) y frontend en React + Vite (Semantic UI,
React Router v6, AuthContext). API de terceros: CheapShark.

## Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env      (poner una SECRET_KEY propia)
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

SECRET_KEY: python -c "import secrets; print(secrets.token_urlsafe(50))"
Swagger: http://127.0.0.1:8000/swagger/

## Frontend
cd frontend
npm install
copy .env.example .env
npm run dev
Abrir http://localhost:5173

## Endpoints principales
- POST /api/v1/auth/register/        registro público
- POST /api/v1/auth/token/           login (JWT)
- GET  /api/v1/auth/me/              datos del usuario (protegido)
- GET  /api/v1/soap/country/{iso}/   consume un servicio SOAP con zeep (protegido)

## Tiempo de vida del token
ACCESS_TOKEN_LIFETIME = 30 minutos: limita el daño si se filtra el token sin
obligar a iniciar sesión constantemente. El refresh dura 1 día.

## API de terceros
CheapShark (https://www.cheapshark.com) se consume con fetch en el Dashboard.
Es gratuita y no requiere API key; su URL base está en VITE_CHEAPSHARK_API_URL.

## Servicio SOAP
CountryInfoService (webservices.oorsprong.org), consumido con zeep desde Django.
Ejemplo: GET /api/v1/soap/country/MX/ con el header Authorization: Bearer <token>.

## Seguridad
- La contraseña nunca aparece en las respuestas de la API (write_only).
- Editar un usuario sin enviar contraseña no la modifica.
- El registro público solo acepta username, email, gamertag y password.
- CORS limitado al origen del frontend (no se permite cualquier origen).
- El frontend borra el token si está vencido o es inválido.
- Los .env no se suben a GitHub.


