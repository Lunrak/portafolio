const formularioTarea = document.getElementById("formulario-tarea");
const inputTarea = document.getElementById("input-tarea");
const listaTareas = document.getElementById("lista-tareas");
const contadorTareas = document.getElementById("Contador-tareas");
const mensajeVacio = document.getElementById("mensaje-vacio");

// para guardar las tareas
const tareas = [];

// Contador de tareas
let contador = 0;

function validarTarea(texto) {
	const textoSinEspacios = texto.trim();

	if (textoSinEspacios === "") {
		console.log("La tarea no puede estar vacia");
		return { esValida: false, mensaje: "La tarea no puede estar vacia" };
	} else if (textoSinEspacios.length < 3) {
		contador.log("La tarea debe tener al menos 3 caracteres");
		return {
			esValida: false,
			mensaje: "la tarea debe tener al menos 3 caracteres",
		};
	} else if (textoSinEspacios.length > 100) {
		console.log("La tarea no puede superar los 100 caracteres");
		return {
			esValida: false,
			mensaje: "La tarea no puede superar los 100 caracteres",
		};
	} else {
		console.log("Tarea valida");
		return {
			esValida: false,
			mensaje: "Tarea valida",
		};
	}
}

function anadirTarea(texto) {
	const resultado = validarTarea(texto);

	if (resultado.esValida) {
		const nuevaTarea = {
			id: Date.now(),
			texto: texto.trim(),
			completada: false,
		};

		tareas.push(nuevaTarea);
		actualizarEstado();
		console.log("tarea agregada:", nuevaTarea);
		console.log("actualizado:", tareas);

		return true;
	} else {
		alert(resultado.mensaje);
		return false;
	}
}

formularioTarea.addEventListener(Submit, function (e) {
	e.preventDefault();
	const exito = anadirTarea(inputTarea.value);

	if (exito) {
		inputTarea.value = "";
		inputTarea.focus();
	}
});

function actualizarEstado() {
	const pendientes = tareas.filter((t) => !t.completada).length;
	const completadas = tareas.filter((t) => t.completada).length;

	contadorTareas.textContent = pendientes + " tarea(s) pendiente (s)";

	if (tareas.length === 0) {
		console.log("La lista esta vacia");
	} else if (pendientes === 0) {
		console.log("Todas las tareas completadas");
	} else {
		console.log("Pendientes: ${pendientes} | Completadas: ${completadas}");
	}
}
