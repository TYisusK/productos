const expres = require("express");
const http = require("http");
const {Server} = require("socket.io");
const path = require("path");
const cors = require("cors");
const {conectarMongoDB}=require("./bd/conexion");
const socket = require("./sockets/socket");
conectarMongoDB();
const app=expres();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
socket(io);


app.use(cors());
app.use("/",expres.static(path.join(__dirname,'/public')));
const port = 3000;
httpServer.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});