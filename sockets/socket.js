const Usuario = require("../modelos/usuario");
const Producto = require("../modelos/producto");

function socket(io) {
    io.on("connection", (socket) => {
        // Mostrar tanto usuarios como productos al conectar
        mostrarUsuarios();
        mostrarProductos();

        // Función para mostrar usuarios
        async function mostrarUsuarios() {
            try {
                const usuarios = await Usuario.find();
                io.emit("servidorEnviarUsuarios", usuarios);
            } catch (err) {
                console.log("Error al obtener los usuarios");
            }
        }

        // Función para mostrar productos
        async function mostrarProductos() {
            try {
                const productos = await Producto.find();
                io.emit("servidorEnviarProductos", productos);
            } catch (err) {
                console.log("Error al obtener los productos");
            }
        }

        // Manejar operaciones de usuarios
        socket.on("clienteGuardarUsuario", async (usuario) => {
            try {
                if (usuario.id === "") {
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado correctamente");
                } else {
                    await Usuario.findByIdAndUpdate(usuario.id, usuario);
                    io.emit("servidorUsuarioGuardado", "Usuario actualizado");
                }
                mostrarUsuarios();
            } catch (err) {
                console.log("Error al registrar al usuario");
            }
        });

        socket.on("clienteObtenerUsuarioId", async (id) => {
            io.emit("servidorObtenerUsuarioId", await Usuario.findById(id));
        });

        socket.on("clienteBorrarUsuario", async (id) => {
            await Usuario.deleteOne({ _id: id });
            mostrarUsuarios();
        });

        
        // Función para mostrar productos
        async function mostrarProductos() {
            try {
                const productos = await Producto.find();
                io.emit("servidorEnviarProductos", productos);
            } catch (err) {
                console.log("Error al obtener los productos");
            }
        }

        // Manejar operaciones de productos
        socket.on("clienteGuardarProducto", async (producto) => {
            try {
                let productoGuardado;
                if (!producto._id) { // Si no hay _id, es un nuevo producto
                    productoGuardado = await new Producto(producto).save();
                    io.emit("servidorProductoGuardado", "Producto guardado correctamente");
                } else { // Si hay _id, es un producto existente que se está editando
                    productoGuardado = await Producto.findByIdAndUpdate(producto._id, producto);
                    io.emit("servidorProductoGuardado", "Producto actualizado");
                }
                mostrarProductos();
                console.log("Producto guardado:", productoGuardado); // Agrega este mensaje de registro
            } catch (err) {
                console.log("Error al registrar el producto:", err); // Agrega este mensaje de error
                io.emit("servidorProductoGuardado", "Error al registrar el producto");
            }
        });
        
        socket.on("clienteObtenerProductoId", async (id) => {
            io.emit("servidorObtenerProductoId", await Producto.findById(id));
        });

        socket.on("clienteBorrarProducto", async (id) => {
            await Producto.deleteOne({ _id: id });
            mostrarProductos();
        });
    });
}

module.exports = socket;
