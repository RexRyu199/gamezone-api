# GameZone API con Docker

Proyecto GameZone: backend en Django REST (usuarios con email, JWT, SOAP con zeep), frontend en React + Vite y base de datos MySQL, todo orquestado con Docker Compose.

## Requisitos
- Docker Desktop instalado y abierto
- Puertos 5173 y 8000 libres

## Instalación
1. Clonar el repositorio y entrar a la carpeta del proyecto.
2. Copiar el archivo de variables de entorno y llenar los valores:
   ```
   copy .env.example .env
   ```
   Generar una SECRET_KEY:
   ```
   python -c "import secrets; print(secrets.token_urlsafe(50))"
   ```
3. Levantar todo el sistema:
   ```
   docker compose up -d --build
   ```

## Accesos
- Frontend: http://localhost:5173
- Backend (Swagger): http://localhost:8000/swagger/

## Comandos útiles
- Ver contenedores: `docker ps`
- Ver logs del backend: `docker compose logs backend`
- Crear superusuario: `docker compose exec backend python manage.py createsuperuser`
- Apagar (los datos se conservan en el volumen): `docker compose down`
- Apagar y borrar también los datos: `docker compose down -v`

## Tiempo de vida del token
ACCESS_TOKEN_LIFETIME = 30 minutos: limita el daño si se filtra el token sin obligar a iniciar sesión constantemente. El refresh dura 1 día.

## API de terceros
CheapShark (https://www.cheapshark.com), gratuita y sin API key.
