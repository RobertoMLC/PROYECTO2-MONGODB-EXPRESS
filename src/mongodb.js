const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } =require("mongodb");

const URI = process.env.MONGODB_URLSTRING;
const client = new MongoClient(URI);

async function connectToMongoDb(){
    try{
        await client.connect();
        console.log('Conectado a la base de datos');
        return client;
    }
    catch(err){
        console.error('Imposible conectarce');
        return null;
    }
};

async function disconnectFromMongoDB(){
    try{
        await client.close();
        console.log('Se ha desconectado de la base de datos');
    }
    catch(err){
        console.error('No ha sido posible desconcetarce de la base de datos');
    }
};
module.exports={connectToMongoDb,disconnectFromMongoDB};
