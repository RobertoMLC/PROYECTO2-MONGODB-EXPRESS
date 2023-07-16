# Proyecto 2 MongoDb + Express

1. [Funcionamiento](#id1)
2. [CRUD](#id2)
3. [Tecnologias Aplicadas](#id3)
4. [Diagrama de Flujo](#id4)
5. [Documentacion](#id5)


### ***IMPORTANTE***:

<u>El proyecto se basa en el archivo "prendas.js" brindado por la institución.</u>

Antes de comenzar las pruebas con la API se debe generar un archivo el la carpeta raíz del proyecto **".env"**.

Esta misma debera contener **4** variables de entorno:

* PORT = "3008" (o el puerto que elijan)
* MONGODB_URISTRING = `mongodb+srv://ejemplo:12345@clusterDB.uhwqbvq.mongodb.net` (URI de DB a trabajar)
* CLUSTERDB = "ExampleDB" (correspondiente al nombre de la base de datos)
* COLLECTIONDB = "PRENDAS" (correspondiente al nombre de la coleccion de la base de datos)

***Mas info en el archivo ".env.sample".***

## Funcionamiento <a name="id1"></a>

La aplicación esta diseñada para la actualización de precios, consulta de produto, eliminación de producto de alguna tienda de ropa.

Los archivos brindados tienen el siguiente formato:

```javascript
{
      "codigo": 1,
      "nombre": "Jeans Denim",
      "precio": 59.99,
      "categoria": "Jeans"
} // Objeto JSON
```

La API esta destinada ,por diferentes rutas y métodos de la URL a:
* Crear un archivo en formato JSON y guardarlo en la Base de datos
* Leer un archivo de la Base de Datos
* Actualizar un archivo de la Base de Datos
* Borrar un archivo de la Base de Datos

Estas utilizan distintos métodos del framework de Node.js llamado "Express" para realizar las peticiones.

### CRUD<a name="id2"></a>

|PETICION |URL| DESCRIPCION|
|  - | - | - |
|GET| `http://localhost:3000/`   | Obtener la pag. principal del servidor |
|GET| `http://localhost:3000/prendas`   | Obtener todas las prendas de la base de datos |
|GET| `http://localhost:3000/prendas/nombres/`**nombre de la prenda(ej:Jeans Denim)**  | Obtener la prenda con el nombre especifico|
|GET| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Obtener la prenda con el cod. especifico |
|GET| `http://localhost:3000/prendas/precio/`**importe de la prenda a buscar(ej:20)**    | Obtener todas las prendas con un importe mayor o igual al colocado |
|GET| `http://localhost:3000/prendas/categoria/`**categoria de la prenda a buscar(ej:Jeans)**    | Obtener todas las prendas que esten en la misma categoria |
|DELETE| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Eliminar la prenda con el cod. especifico |
|PUT| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Modificar la prenda con el cod. especifico en caso de que no existe crear una nueva |
|PATCH| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Modificar la prenda con el cod. especifico |
|POST| `http://localhost:3000/prendas` | Crear la prenda (asegurarce que tengan el mismo formato y propiedades) |


### Tecnologias Aplicadas <a name="id3"></a>

***Proyecto 2 MongoDB-Express*** esta totalmente escrito en ***javascript*** utilizando el entorno de desarrolo de **Node.js**  y el sistema de paquetes y dependencias **"npm"**  utilizando los framework **"express"** este es requirido en la archivo principal "server.js" este mismo, es el que inicia el servidor que se comunica por el prot. HTTP junto con las dependencias "dotenv" que se utiliza para poder llamar variables de entorno ,"mongodb" utilizado para conectarce y realizar operaciones en la base de datos y "nodemon" herramienta para reiniciar el servidor al hacer un cambio, que se utilizó para desarrollar la API.

 Para inicializar el server en modo de desarrolador colocar en la terminal :
 ```terminal
 npm run dev
 ```

En la carpeta '/src' se encuentra el archivo 'mongodb.js', en esta se encuentra las funciones desarrolladas para el manejo del servidor a la base de datos.

***MongoDb*** es una base de datos no relacional (noSQL) que utilaza en la API. Se debe crear una DB en la misma pag. de Mongo, dentro de la DB se debe crear una "collection" para lograr la correcta conexión.

#### Diagrama de flujo <a name="id4"></a>
```mermaid
graph TD;
    RESPOND-->CLIENT;
    CLIENT-->REQUEST;
    REQUEST-->SERVER;
    SERVER<-->EXPRESS;
    SERVER-->RESPOND;
    EXPRESS<-->MONGODB;
```

### Doumentacion<a name="id5"></a>:

Vease [MongoDb](https://www.mongodb.com/) con su GUI [Compass](https://www.mongodb.com/docs/compass/current/?_ga=2.103110848.1790828399.1689402529-1252052443.1687957659) documentación oficial.

Vease [Node.js](https://nodejs.org/en/docs) con su adm. de dependecias y paquetes [npm](https://docs.npmjs.com/).

Vease [Express](https://expressjs.com/) ,[dotenv](https://www.npmjs.com/package/dotenv) ,[mongodb](https://www.npmjs.com/package/mongodb) paquetes de ***npm***.
