const proyectos = [
	{ nombre: "Portafolio Personal", tecnologia: "HTML, CSS, JavaScript" },
	{ nombre: "To-Do App", tecnologia: "HTML, CSS, JavaScript" },
	{ nombre: "Juego del Ahorcado", tecnologia: "HTML, CSS, JavaScript" },
	{ nombre: "Juego de Memoria", tecnologia: "TypeScript" },
	{ nombre: "Dashboard de Juegos", tecnologia: "React, TypeScript" },
	{ nombre: "Simon Dice", tecnologia: "React Native, TypeScript" },
];

function renderizarProyectos() {
	const contenedor = document.querySelector(".galeria-proyectos");
	console.log(contenedor);
	if (!contenedor) {
		console.log("No se encontro el contenedor .galeria-proyectos");
		return;
	}
	contenedor.innerHTML = "";

	for (const proyecto of proyectos) {
		const articulo = document.createElement("articulo");
		articulo.className = "tarjeta-proyecto";

		articulo.innerHTML = `
            <div class="tarjeta-contenido">
                <h4>${proyecto.nombre}</h4>
                <p><strong>Tecnología:</strong> ${proyecto.tecnologia}</p>
                <p><strong>Estado:</strong> ${proyecto.estado}</p>
                <a href="#" class="tarjeta-enlace">Ver proyecto →</a>
            </div>
        `;

		contenedor.appendChild(articulo);
	}

	console.log("Renderizados ${proyectos.length} proyectos");
}

document.addEventListener("DOMContentLoaded", () => {
	renderizarProyectos();
	renderizarConteoTecnologias();
});

// Mensaje de bienvenida según la hora del día
const horaActual = new Date().getHours();
let saludo = "";
let emoji = "";

if (horaActual >= 5 && horaActual < 12) {
	saludo = "Buenos días";
	emoji = "🌅";
} else if (horaActual >= 12 && horaActual < 20) {
	saludo = "Buenas tardes";
	emoji = "☀️";
} else {
	saludo = "Buenas noches";
	emoji = "🌙";
}

console.log(`${saludo} ${emoji} — Son las ${horaActual}:00 horas`);

const cabeceraTitulo = document.querySelector(".cabecera-principal p");
if (cabeceraTitulo) {
	cabeceraTitulo.textContent = `${saludo} ${emoji} | Desarrollador Web en Formación`;
}

function renderizarConteoTecnologias() {
	const sidebar = document.querySelector(".sidebar-grid");
	if (!sidebar) return;

	const tecnologias = [
		{ nombre: "HTML", nivel: "✅" },
		{ nombre: "CSS", nivel: "✅" },
		{ nombre: "JavaScript", nivel: "🟡" },
		{ nombre: "TypeScript", nivel: "⚪" },
		{ nombre: "React", nivel: "⚪" },
		{ nombre: "React Native", nivel: "⚪" },
	];

	const completadas = tecnologias.filter((t) => t.nivel === "✅").length;
	const enProgreso = tecnologias.filter((t) => t.nivel === "🟡").length;
	const pendientes = tecnologias.filter((t) => t.nivel === "⚪").length;

	const divEstado = document.createElement("div");
	divEstado.className = "estado-tecnologias";
	divEstado.innerHTML = `
    <h3>📊 Estado de Tecnologías</h3>
    <p>✅ Completadas: ${completadas}</p>
    <p>🟡 En progreso: ${enProgreso}</p>
    <p>⚪ Pendientes: ${pendientes}</p>
  `;

	sidebar.appendChild(divEstado);
}
