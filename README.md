# Proyecto 2 MongoDb + Express

1. [Funcionamiento](#id1)
2. [CRUD](#id2)
3. [Tecnologias](#id3)


### ***IMPORTANTE***:

<u>El proyecto se basa en el archivo "prendas.js" brindado por la institucion</u>.

Antes de comenzar las pruebas con la API se debe generar un archivo el la carpeta raiz del proyecto **".env"**
Esta misma debera contener **4** variables de entorno:

* PORT = "3008" (o el puerto que elijan)
* MONGODB_URISTRING = mongodb+srv://ejemplo:12345@clusterDB.uhwqbvq.mongodb.net (URI de DB a trabajar)
* CLUSTERDB = "ExampleDB" (correspondiente al nombre de la base de datos)
* COLLECTIONDB = "PRENDAS" (correspondiente al nombre de la coleccion de la base de datos)

***Mas info en el archivo ".env.sample".***

## Funcionamiento <a name="id1"></a>

La aplicacion esta diseñada para el control de stock,actualizacion de precios, consulta de produto, eliminacion
de producto de alguna tienda de ropa.

Los archivos brindados tienen el siguiente formato:

```javascript
{
      "codigo": 1,
      "nombre": "Jeans Denim",
      "precio": 59.99,
      "categoria": "Jeans"
} // Objeto JSON
```

La API esta destinada ,por diferentes rutas y metodos de la URL a:
* Crear un archivo en formtato JSON y guardarlo en la Base de datos
* Leer un archivo de la Base de Datos
* Actualizar un archivo de la Base de Datos
* Borrar un archivo de la Base de Datos

Estas utilizan distintos metodos del frameworck de Node.js llamado "Express" para realizar las peticiones.

### CRUD<a name="id2"></a>

|PETICION |URL| DESCRIPCION|
|  - | - | - |
|GET| `http://localhost:3000/`   | Obtener la pag. principal del server |
|GET| `http://localhost:3000/prendas`   | Obtener todas las prendas de la base de datos |
|GET| `http://localhost:3000/prendas/nombres/`**nombre de la prenda(ej:Jeans Denim)**  | Obtener la prenda con el nombre especifico|
|GET| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Obtener la prenda con el cod. especifico |
|GET| `http://localhost:3000/prendas/precio/`**importe de la prenda a buscar(ej:20)**    | Obtener todas las prendas con un importe mayor o igual al colocado |
|GET| `http://localhost:3000/prendas/categoria/`**categoria de la prenda a buscar(ej:Jeans)**    | Obtener todas las prendas que esten en la misma categoria |
|DELETE| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Eliminar la prenda con el cod. especifico |
|PUT| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Modificar la prenda con el cod. especifico en caso de que no existe crear una nueva |
|PATCH| `http://localhost:3000/prendas/codigo/`**codigo de la prenda(ej:1)**   | Modificar la prenda con el cod. especifico |
|POST| `http://localhost:3000/prendas` | Crear la prenda (asegurarce que tengan el mismo formato y propiedades) |







<a name="id1"></a>
Texto del primer apartado
## Segundo apartado
Texto del segundo apartado

___adffgag___

>esto es una cita *dddd*

~~15151514~~

<u>dadadad</u>

**dadadad**

***adadaa***

### Listado

- [x] Coooo!
- [ ] aCA
- [ ] ad

|PETICION |URL| DESCRIPCION|
|  - | - | - |
|GET| `http://localhost:3000`  | Obtenr frutas|
|GET| `http://localhost:3000`  | Obtenr frutas|
|GET| `http://localhost:3000`  | Obtenr frutas|

```js
    let ad = "dadad";
```

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
