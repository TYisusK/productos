const { mongoose } = require("../bd/conexion");

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    estatus: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Producto', productoSchema);
