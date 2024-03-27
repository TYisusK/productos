const mongoose = require('mongoose');
require('dotenv').config()
async function conectarMongoDB() {
    mongoose.set('strictQuery',true);
    try{
        const conexion = await mongoose.connect(process.env.mongoAtlas);
        console.log("Conexion a MongoDB correctamente");
    }
    catch(err){
        console.error("Error al conectar con Mongo "+err);
    }
}
//conectarMongoDB();

module.exports={
    conectarMongoDB,
    mongoose
}