const express = require('express');
const dotenv = require('dotenv');
      dotenv.config();
const { connectToMongoDb, disconnectFromMongoDB } = require('./src/mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

//app.use(express.json());
//console.log(process.env.CLUSTERDB);

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido a la API Tienda de Ropa "LA ROBER TIENDA"');
});

app.get("/prendas", async (req, res) => {
  try {
    // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    // Obtener la colección de prendas y convertir los documentos a un array
    const db = client.db(process.env.CLUSTERDB);
    const prenda = await db.collection(process.env.COLLECTIONDB).find().toArray();
    res.json(prenda);
  } catch (error) {
    console.log(error);
    // Manejo de errores al obtener las frutas
    res.status(500).send("Error al obtener las prendas de ropa de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para obtener una fruta por su ID
app.get("/prendas/codigo/:id", async (req, res) => {
  const prendaId = parseInt(req.params.id);
 // if(prendaId === NaN){ return res.send('Formato Incorrecto! Coloque un numero e intente nuevamente')};
  try {
    // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    // Obtener la colección de prenda y buscar la fruta por su ID
    const db = client.db(process.env.CLUSTERDB);
    const prendas = await db.collection(process.env.COLLECTIONDB).findOne({ codigo: prendaId });
    if (prendas) {
      res.json(prendas);
    } else {
      res.status(404).send(`Prenda con id:${prendaId} no existe`);
    }
  } catch (error) {
    // Manejo de errores al obtener la prenda
    res.status(500).send(`Error al obtener la prenda con id::${prendaId} de la base de datos`);
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

app.get('/prendas/categoria/:categoria', async (req , res) =>{
  const prendaQuery = req.params.categoria;
  let prendaCat = RegExp(prendaQuery.trim().toLowerCase(), "i");
  try{
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    const db = client.db(process.env.CLUSTERDB);
    const prendas = await db.collection(process.env.COLLECTIONDB).find({ categoria: prendaCat }).toArray();
    if (prendas.length > 0) {
      res.json(prendas);
    } else {
      res.status(404).send( "No se encontraron coincidencias en la categoria.");
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send("Error al obtener la prenda por la categoria de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
})

app.get('/prendas/nombres/:nombre', async (req, res) => {
  const prendaQuery = req.params.nombre;
  let prendaNombre = RegExp(prendaQuery.trim().toLowerCase(), "i");
  console.log(prendaNombre);
  try {
  // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    // // Obtener la colección de prenda y buscar la prenda por su nombre
    const db = client.db(process.env.CLUSTERDB);
    const prendas = await db.collection(process.env.COLLECTIONDB).find({ nombre: prendaNombre }).toArray();
    if (prendas.length > 0) {
      res.json(prendas);
    } else {
      res.status(404).send("No se encontraron coincidencias en los nombres.");
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send("Error al obtener la prenda por el nombre de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.get('/prendas/precio/:precio', async (req, res) => {
  const prendaQuery = parseInt(req.params.precio);
  console.log(prendaQuery);
  try {
     // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    const db = client.db(process.env.CLUSTERDB);
    const prendas = await db.collection(process.env.COLLECTIONDB).find({ precio: { $gte: prendaQuery } }).toArray();
    //console.log(prendas.length);
    if (prendas.length > 0) {
      res.json(prendas);
    } else {
      res.status(404).send("No se encontraron coincidencias en los precios.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener la prenda por el precio de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.post('/prendas', async (req, res) => {
  const nuevaPrenda = req.body;
 // console.log(typeof(nuevaPrenda));
  try {
    if (nuevaPrenda == undefined ) {
      res.status(400).send('Error en el formato de datos a crear.');
    }
    //Conexion a la base de datos;
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send('Error al conectarce a MongoDB.');
    }
    const db = client.db(process.env.CLUSTERDB);
    const collection = db.collection(process.env.COLLECTIONDB);
    await collection.insertOne(nuevaPrenda);
    console.log('Nueva prenda agregada con exito!.')
    res.status(201).send(nuevaPrenda);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al intentar agregar una prenda");
  } finally {
    await disconnectFromMongoDB();
    res.redirect('back');
  }
});

app.put('/prendas/codigo/:id', async (req, res) => {
  const prendaId = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos) {
      res.status(400).send('Error en el formato de datos');
    }
     // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
        res.status(500).send('Error al conectarce a MongoDB.');
    }
      const db = client.db(process.env.CLUSTERDB);
      const collection = db.collection(process.env.COLLECTIONDB);
      const prendaFind = await db.collection(process.env.COLLECTIONDB).findOne({ codigo: prendaId });
      //si existe la prenda la modifica
      if(prendaFind){
        await collection.updateOne({ codigo: prendaId }, { $set: nuevosDatos });
        res.status(200).send(`Prenda Modificada con id:${prendaId}! Cuidado revisar el formato 👀`);
      //sino la crea.. pero sin el formato correspondiente
      } else {
        await collection.insertOne(nuevosDatos);
        console.log('Nueva prenda agregada con exito! Cuidado revisar el formato 👀.')
        res.status(201).send(nuevosDatos);
      }
  } catch (error) {
    res.status(500).send(`Error al modificar o crear la prenda con id:${prendaId} `+ error);
  } finally {
    await disconnectFromMongoDB;
  }
});

app.patch('/prendas/codigo/:id', async (req , res) =>{
  const prendaId = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos){
      res.status(400).send("Error en el formato de datos a crear.");
    }
    // Conexion a la base de datos
    const client = await connectToMongoDb();
    if(!client){
      res.status(500).send("Error al conectarce a la base de datos")
    }
    const db = client.db(process.env.CLUSTERDB);
    const collection = db.collection(process.env.COLLECTIONDB);
    const prendaFind = await db.collection(process.env.COLLECTIONDB).findOne({ codigo: prendaId });
    //si existe la prenda la modifica
    if(prendaFind){
      await collection.updateOne({ codigo: prendaId }, { $set: nuevosDatos });
      res.status(200).send(`Prenda Modificada con id:${prendaId}! Cuidado revisar el formato 👀`);
      //sino la crea.. pero sin el formato correspondiente
    } else {
      res.status(200).send(`La prenda con id:${prendaId} no existe. Imposible modificar!. `);
      }
  } catch (error) {
    res.status(500).send(`Error al modificar la prenda con id:${prendaId} `+ error);
  } finally {
    await disconnectFromMongoDB;
  }
})

app.delete('/prendas/codigo/:id', async (req , res) =>{
  const prendaId = parseInt(req.params.id);
  try{
  if (!prendaId){
      res.status(400).send('Erro en el formato de datos a crear.');
      return;
    }
    // Conexión a la base de datos
    const client = await connectToMongoDb();
    if(!client){
      res.status(500).send('Error al conectarse a MongoDB');
      return;
    }
    const db = client.db(process.env.CLUSTERDB);
    const collection = db.collection(process.env.COLLECTIONDB);
    const result = await collection.deleteOne({codigo: prendaId})
    if(result.deletedCount === 0){
      res.status(400).send('No se encontro prenda con el id seleccionado')
    } else {
      res.status(200).send(`Prenda con el id:${prendaId} eliminada de DB`);
    }
  }
  catch(error){
    res.status(500).send(`Error al eliminar la prenda con el id:${prendaId} .`);
  } finally {
    await disconnectFromMongoDB;
  }
});
// Manejo de rutas inexistentes
app.get('*', (req ,res) =>{
  res.send('Lo sentimos la ruta especificada no existe.')
})

// Abrir server

app.listen(PORT, () => console.log(`Escuchando del puerto ${PORT}`))

// Usar el comando "npm run dev" en la terminal para utilizar nodemon
// Copyright 2023
