const {mongoose}=require("../bd/conexion");
const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    usuario:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    estatus:{
        type:Boolean,
        default:true
    }
});

module.exports=mongoose.model('usuario',usuarioSchema);