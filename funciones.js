if (!sessionStorage.getItem('usuarioActivo')) {
    window.location.href = 'Inicio_registri.html';
}

function mostrar() {
    document.getElementById('inicio-secion').classList.remove('ocultar');
    document.getElementById('registro').classList.add('ocultar');
}

function mostrarRegistro() {
    document.getElementById('registro').classList.remove('ocultar');
    document.getElementById('inicio-secion').classList.add('ocultar');
}

function volver() {
    document.getElementById('registro').classList.add('ocultar');
    document.getElementById('inicio-secion').classList.add('ocultar');
}

function registrarse() {
    const nombre = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const pass = document.querySelector('#registro input[type="password"]').value;

    if (!nombre || !email || !pass) {
        alert("Completa todos los campos.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    if (usuarios[email]) {
        alert("Este correo ya está registrado.");
        return;
    }

    usuarios[email] = {
        nombre,
        pass,
        actividades: {}
    };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Registro exitoso. Ahora inicia sesión.");
    volver();
}


function iniciarSesion() {
    const correo = document.getElementById('correo').value;
    const pass = document.getElementById('contraseña').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    const usuario = usuarios[correo];

    if (!usuario || usuario.pass !== pass) {
        alert("Correo o contraseña incorrectos.");
        return;
    }

    sessionStorage.setItem('usuarioActivo', correo);
    window.location.href = 'MiAgenda.html';
}

function agregarActividad() {
    const correo = sessionStorage.getItem('usuarioActivo');
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuario = usuarios[correo];

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const horaI = document.getElementById('horadeI').value;
    const horaF = document.getElementById('horadeF').value;
    const fecha = document.getElementById('fechaActividad').value;

    if (!nombre || !descripcion || !ubicacion || !horaI || !horaF || !fecha) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    usuario.actividades[fecha] = usuario.actividades[fecha] || [];
    const conflicto = usuario.actividades[fecha].some(act =>
        (horaI < act.horaF && horaF > act.horaI)
    );

    if (conflicto) {
        alert("Conflicto de horario con otra actividad.");
        return;
    }

    usuario.actividades[fecha].push({
        nombre, descripcion, ubicacion, horaI, horaF
    });

    usuarios[correo] = usuario;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cargarAgenda(fecha);
    limpiarCampos();
}

function cargarAgenda(fecha) {
    const correo = sessionStorage.getItem('usuarioActivo');
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const actividades = usuarios[correo].actividades[fecha] || [];

    const tabla = document.getElementById('agendaTabla');
    tabla.innerHTML = '';

    actividades.forEach(act => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${act.nombre}</td>
            <td>${act.descripcion}</td>
            <td>${act.ubicacion}</td>
            <td>${act.horaI}</td>
            <td>${act.horaF}</td>
        `;
        tabla.appendChild(fila);
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('ubicacion').value = '';
    document.getElementById('horadeI').value = '';
    document.getElementById('horadeF').value = '';
}

function cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
    window.location.href = 'Inicio_registri.html';
}
