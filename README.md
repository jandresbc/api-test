# instrucciones para la instalación
1. clonar el proyecto desde la siguiente url: git clone https://github.com/jandresbc/api-test.git
2. crear el archivo .env y pegar los siguientes datos.
    PORT=3333
    HOST=127.0.0.1
    NODE_ENV=development
    APP_KEY=cogV46CkQpRZvat2OYOvu5aiUhmLHZYn
    DRIVE_DISK=local
    DB_CONNECTION=mysql
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=
    MYSQL_DB_NAME=laboratory

Nota: la base de datos se desarrollo con el motor mysql, configurar el .env a las configuraciones locales.
3. ingresar al proyecto: cd api-test
4. ejecutar el comando npm install o npm install --force
5. ejecutar las migraciones, una vez configurada el archivo .env: node ace migration:run
6. iniciar el proyecto node ace serve --watch
