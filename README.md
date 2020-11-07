# Julius API application

    En Julius API application puedes registrarte, e ingresar para publicar tus historias,
    podras ver cada historia, actualizarla y eliminarla solo si eres el autor de la misma

## Pasos para ejecutar la aplicación

### 1. Debes clonar la aplicación

    En sistemas linux o usando GIT Bash, Utiliza el siguiente comando:
        `git clone https://github.com/MichaelAuditore/JuliusApi.git`

    Nota: si no tienes ninguno de los anteriores accede a la url y descargalo como archivo ZIP y descomprime

### 2. Recursos creados para la aplicación

    [X] POST /signup - este metodo con su respectivo verbo nos sirve para registrar un usuario en nuestra db
    [X] POST /signin - este metodo con su respectivo verbo nos sirve para validar si el usuario esta registrado
                        con el fin de dar acceso a la aplicación
    [X] GET /api/user - este metodo con su respectivo verbo nos sirve para obtener los datos del usuario actual
    [X] PUT /api/user - este metodo con su respectivo verbo nos sirve para actualizar los datos del usuario actual

    [X] GET /api/post - este metodo con su respectivo verbo nos sirve para obtener todos los posts
    [X] POST /api/post - este metodo con su respectivo verbo nos sirve para crear un post en la base de datos
    [X] GET /api/post/:id - este metodo con su respectivo verbo nos sirve para obtener un post en especifico
    [X] GET /api/post/:match - este metodo con su respectivo verbo nos sirve para encontrar coincidencias de un post
                                por titulo o por contenido.
    [X] PUT /api/post/:id - este metodo con su respectivo verbo nos sirve para actualizar un post en la base de datos
    [X] DELETE /api/post/:id - este metodo con su respectivo verbo nos sirve para eliminar un post en la base de datos

## Modelos

    User - modelo que representa a un usuario en base de datos
    Post - modelo que representa un post en base de datos

### Estrutura de Modelos

    User: {
        _id: "Id único de usuario",
        username: "Nombre de usuario único",
        email: "correo electronico único",
        password: "contraseña encriptada"
    }

    Post: {
        _id: "Id único de usuario",
        title: "Titulo de post",
        content: "Contenido del post",
        url: "Url de la imagen del post",
        createdBy: "Id de usuario creador del post"
    }

# Comandos Validos usando NPM para ejecutar la aplicación

    "build" - genera la carpeta que convierte typescript en JS usando babel
    "test" - genera un entorno de testeo para la aplicación
    "test-routes" - ejecuta el entorno de testeo de los endpoints creados para la aplicación
    "test-models" - ejecuta el entorno de testeo para los modelos creados y relaciones a la DB,
    "test-controllers" - ejecuta el entorno de testeo para las funciones de CRUD de la app en DB,
    "test-auth" - ejecuta el entorno de testeo para las funciones de registro, ingreso y autenticación
    "dev" - ejecuta un entorno local para correr la aplicación
    "prod": ejecuta un entorno de produccion para correr la aplicación,
    "restart" - crea el directorio y ejecuta el comando **build** y **start**
    "start": "node dist/index.js"

    Nota: para ejecutar el comando dev, es necesario acceder al archivo[index.js](src/config/index.js) y cambiar la variable env a **"development"**

# Autor

    <michael_v613@hotmail.com>[michaelAuditore]

## MongoDB Database

    Esta aplicación esta sujeta a una base de datos actualmente corriendo en MongoDB Atlas.
