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
	return;
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

document.addEventListener("DOMContentLoaded", renderizarProyectos);
