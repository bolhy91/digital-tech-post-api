# Digital Tech - Api

## Instalacion

RUN `npm i`

COPY THE TEST ENVIROMENT FROM THE FILE `variables.md` AND PASTE IT IN THE .ENV

CREATE AN `.ENV` FILE IN THE PROJECT ROOT

RUN `npm run dev`

## Description

El api consta de los siguientes servicios:

URL: http://localhost:5000/api/

* **auth/login** Autenticacion del usuario por medio de su username, esto le devuelve un token.
##### Ejemplo:

```
{
    "username": "luciano2020"
}
```
* **auth/register**: Registro del usuario a nuestra app, debe proporcionar name, surname, username.
##### Ejemplo:
```
{
    "username": "luciano2020",
    "name": "Luciano",
    "surname": "Sanchez",
    "role": "ADMIN | USER",
    "image": "file"
}
```
* **posts [GET]**: Lista todos los posts de los usuarios.
* **posts [POST]**: Crea un post nuevo en nuestra app.
##### Ejemplo:
```
{
    "message": "Lorem ipsum",
    "location": "Paris",
    "image": "file",
    "status": "PUBLISHED | DELETE | DRAFT"
}
```
* **posts/{postId}/like [GET]**: Darle like a un post.

### Herramientas utilizadas
* Typescript
* express
* mongoDb
* aws-sdk
* multer
