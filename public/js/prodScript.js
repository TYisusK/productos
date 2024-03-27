const socket = io();

// Mostrar productos
socket.on("servidorEnviarProductos", (productos) => {
    let tr = "";
    productos.forEach((producto, index) => {
        // Calcular el ID a mostrar sumando 100 al índice
        const idMostrado = index * 100 + 100;
        tr += `
            <tr>
                <td>${idMostrado}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>
                    <a href="#" onclick="editarProducto('${producto._id}')">Editar</a> /
                    <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datos").innerHTML = tr;
});

// Guardar producto
const formNuevoProducto = document.getElementById("formNuevoProducto");
formNuevoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const producto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        categoria: document.getElementById("categoria").value
    };
    const id = document.getElementById("id").value; // Obtener el ID del formulario
    if (id) {
        // Si hay un ID, enviar una solicitud para actualizar el producto
        producto._id = id; // Agregar el ID al objeto del producto
        socket.emit("clienteGuardarProducto", producto);
    } else {
        // Si no hay ID, enviar una solicitud para guardar un nuevo producto
        socket.emit("clienteGuardarProducto", producto);
    }
});

// Editar producto
function editarProducto(id) {
    console.log("Estás en editar producto " + id);
    socket.emit("clienteObtenerProductoId", id);
    socket.once("servidorObtenerProductoId", (producto) => {
        document.getElementById("tituloFormulario").innerHTML = "Editar producto";
        document.getElementById("textoBoton").innerHTML = "Editar producto";
        document.getElementById("id").value = producto._id;
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("descripcion").value = producto.descripcion;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("categoria").value = producto.categoria;
    });
}

// Borrar producto
function borrarProducto(id) {
    socket.emit("clienteBorrarProducto", id);
}
