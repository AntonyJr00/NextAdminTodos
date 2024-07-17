# Development

1. Pasos para levantar la app en desarrollo.

- Run database by -D
  ...
  docker compose up -d
  ...

2. Crear una copia del .env.tamplate y renombrarlo a .env

3. Reemplazar las variables de entorno

4. Ejecutar el comando `npm install`

5. Ejecutar el comando `npm run dev`

6. Ejecutar los comandos de `Prisma commands`

7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

# Nota:

(**usuario**); test1@google.com
(**password**): 123456

# Prisma commands

...
npx prisma init
npx prisma migrate dev
npx prisma generate
...
