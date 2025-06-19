var usuarios = {};
let inventario = [];
const boton = document.querySelector('button');

function mostrar() {
    boton.addEventListener('click', e => alert('Has pulsado el botón :: ' + e.isTrusted));addEventListener(click)
}

function registrarUsuario(){
if (usuarios == null){
    usuarios = {};
}
var nombre = document.getElementById('usuario')
var correo = document.getElementById('correo');
var contraseña = document.getElementById ('contraseña')
let usuario = {
    nombre: nombre,
    telefono: telefono,
    contraseña: contraseña,
}
usuarios[documento] = usuario;
localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

function agregarActividad() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const horadeI = (document.getElementById('horadeI').value);
    const horadeF = (document.getElementById('horadeF').value);

    if (nombre && ubicacion && descripcion && !isNaN(horadeI) && !isNaN(horadeF)) {
        inventario.push({ nombre, descripcion, ubicacion, horadeI, horadeF });
        limpiarCampos();
        actualizarTabla();
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
}

function actualizarTabla() {
    const tabla = document.getElementById('agendaTabla');
    tabla.innerHTML = "";

    inventario.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.descripcion}</td>
        <td>${p.ubicacion}</td>
        <td>${p.horadeI}</td>
        <td>${p.horadeF}</td>
    `;
        tabla.appendChild(fila);
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('ubicacion').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('horadeI').value = '';
    document.getElementById('horadeF').value ='';
}
