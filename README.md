
# Eiteck Node App

Esta es una prueba como parte del proceso de admisión para una oferta laboral en **Eiteck**.

Para profundizar el código se puede realizar una clonación de este repositorio con el siguiente comando:

```
git clone
```

Ya con el repositorio clonado se debe realizar algunas configuraciones para verificar su funcionamiento.
* Para verificar los cambios realizados al proyecto se debe instalar un paquete con el siguiente comando:

```
 npm i nodemon -g
```

Este comando se puede instalar de manera global en el sistema, para sistemas operativos como Mac y Linux se debe agregar sudo al principio del comando, en Windows se debe ejecutar la terminal como administrador; si es que es solo para este proyecto quitar **-g**
    
* De igual manera es necesario todos los paquetes utilizados en este proyecto, para instalarlos ejecutar el siguiente comando:

```
npm install
```
* Por último es necesario crear un archivo, el cual contendrá todos las variables que manejan información delicada en nuestro archivo, a este lo llamaremos **.env**.

    Este archivo debe tener las siguientes variables:
    ```
    PORT=[Número del Puerto] (En desarrollo)
    DB_CT=[Enlace hacia Cluster-DB]
    SECRET_JWT_SEED=[Frase para token]
    ```
    De esta manera es como debe correr sin ningún inconveniente este proyecto.

---

## Estructura

Esta API presenta 5 modelos los cuales sirven como solución para el problema planteado, los cuales son:
* User - Usuario
* Role - Rol de Usuario
* BreadBox - Caja de Pan
* Order - Orden
* Shipmen - Envío 

Apliqué la metodología en cascada para desarrollar esta API y mediante esta llegué a la conclusión de generar los CRUD endpoints de los modelos, así como los endpoints para la sesión.

La sesión maneja JSON Web Token(JWT) por lo cual todos los endpoints requieren token, a excepción del registro y el logueo;
mediante el token valido el rol de cada usuario y por ende valido el acceso hacia cada uno de los endpoints en base a los requerimientos.

## Modelos
Al estar en la etapa de **Análisis** planifiqué desarrollar 2 modelos más de los que se presentaban en el problema, como son el **Rol** y el **Envío**, los cuales me permiten lo siguiente:
* **Rol**: Mediante este modelo valido el rol con el que debe crearse un nuevo **Usuario**, los valores ya fueron ingresados previamente en la BD, por lo cual se valida el ingreso con estos datos.
* **Envío**: Permite confirmar el envío de un pedido, ingresando el usuario que realizar el envío, la orden, y el estado del envío. Este modelo se desarrolló principalmente para que el **usuario delivery** no manipule los datos de la orden, así el nuevo modelo solo tenga refencias a este.
* Los demás modelos permiten el guardado de la información principal de la aplicación.


## Mejoría
Este API contiene muchos endpoints para la solución del problema, por lo cual es importante realizar una documentación automática de todos los enpoints y los modelos que engloban la API.


# En Desarrollo

Como mencioné antes, para ejecutar la apliación se necesita de las varirables de entorno por lo cual, se deben ingresar estos valores independientemente del host que se utilice.
```
    DB_CT=[Enlace hacia Cluster-DB]
    SECRET_JWT_SEED=[Frase para token]
```

Cuando el proyecto en producción esté funcionando correctamente ingresar estos valores de manera manual a la colección **Role**
```
    roles = ['ADMIN_ROLE', 'USER_ROLE', 'DELIVERY_ROLE']
```
Cada valor del array es un registro en la colección.


Cuando ingrese estos valores ya puede proceder a crear los usuarios y por ende, el funcionamiento general del API.





    