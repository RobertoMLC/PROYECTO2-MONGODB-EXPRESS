const express = require('express');
const { connectToMongoDb, disconnectFromMongoDB } = require('./src/mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

//app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido a la API frutas');
});

app.get("/frutas", async (req, res) => {
  try {
    // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    // Obtener la colección de frutas y convertir los documentos a un array
    const db = client.db("frutas");
    const frutas = await db.collection("frutitas").find().toArray();
    res.json(frutas);
  } catch (error) {
    console.log(error);
    // Manejo de errores al obtener las frutas
    res.status(500).send("Error al obtener las frutas de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para obtener una fruta por su ID
app.get("/frutas/id/:id", async (req, res) => {
  const frutaId = parseInt(req.params.id);
  try {
    // Conexión a la base de datos
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    // Obtener la colección de frutas y buscar la fruta por su ID
    const db = client.db("frutas");
    const fruta = await db.collection("frutitas").findOne({ id: frutaId });
    if (fruta) {
      res.json(fruta);
    } else {
      res.status(404).send("Fruta no encontrada");
    }
  } catch (error) {
    // Manejo de errores al obtener la fruta
    res.status(500).send("Error al obtener la fruta de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

app.get('/frutas/nombre/:nombre', async (req, res) => {
  const frutaQuery = req.params.nombre;
  let frutaNombre = RegExp(frutaQuery, "i");
  console.log(frutaQuery);
  try {
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    const db = client.db('frutas');
    const frutas = await db.collection("frutitas").find({ nombre: frutaNombre }).toArray();
    console.log(frutaNombre);
    if (frutas) {
      res.json(frutas);
    } else {
      res.status(404).json([
        { id: "Error", descripcion: "No se encontraron coincidencias en los nombres." },
      ]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener la fruta por el nombre de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.get('/frutas/precio/:precio', async (req, res) => {
  const frutaQuery = parseInt(req.params.precio);
  //const frutaQuery = parseInt(req.params.precio);
  // let frutasNombre = RegExp(frutaQuery,"i");
  console.log(frutaQuery);
  try {
    //  let nombre = req.params.nombres.trim().toLowerCase();
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }
    const db = client.db('frutas');
    const frutas = await db.collection("frutitas").find({ importe: { $gte: frutaQuery } }).toArray();//find().toArray();
    console.log(frutaQuery);
    //  const result = client.filter(producto => producto.nombre.toLowerCase().includes(nombre));
    if (frutas.length > 0) {
      res.json(frutas);
    } else {
      res.status(404).json([
        { id: "Error", descripcion: "No se encontraron coincidencias en los precios." },
      ]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener la fruta por el precio de la base de datos");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.post('/frutas', async (req, res) => {
  const nuevaFrutas = req.body;
  try {
    if (nuevaFrutas == undefined) {
      res.status(400).send('Error en el formato de datos a crear.');
    }
    //Conexion a la base de datos;
    const client = await connectToMongoDb();
    if (!client) {
      res.status(500).send('Error al conectarce a MongoDB.');
    }
    const db = client.db('frutas');
    const collection = db.collection('frutitas');
    await collection.insertOne(nuevaFrutas);
    console.log('Nueva frutas creada.')
    res.status(201).send(nuevaFrutas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al intentar agregar una fruta");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.put('/frutas/:id', async (req, res) => {
  const idFrutas = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos) {
      res.status(400).send('Error en el formato de datos');
    }
    const client = await connectToMongoDb();
    if (!client) {
      const db = client.db('frutas');
      const collection = db.collection('frutitas');
      await collection.updateOne({ id: idFrutas }, { $set: nuevosDatos });
      console.log('Fruta modificada');
      res.status(500).send('Fruta Modificada');

    }
  } catch (error) {

  }
})
app.patch('/frutas/:id', )
app.listen(PORT, () => console.log(`Escuchando del puerto ${PORT}`))
