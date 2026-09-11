import { JuegoMemoria } from "./JuegoMemoria.js";
import { DificultadMemoria, EstadoCarta } from "./interfaces.js";

const tableroEl = document.getElementById("tablero") as HTMLDivElement;
const intentosEl = document.getElementById("intentos") as HTMLSpanElement;
const parejasEl = document.getElementById("parejas") as HTMLSpanElement;
const totalParejasEl = document.getElementById("total-parejas") as HTMLSpanElement;
const botonReiniciar = document.getElementById("boton-reiniciar") as HTMLButtonElement;
const selectorDificultad = document.getElementById("dificultad") as HTMLSelectElement;
const pantallaResultado = document.getElementById("pantalla-resultado") as HTMLDivElement;

let juego: JuegoMemoria;
let bloqueado = false;

function iniciarJuego(): void {
	const dificultadSeleccionada = selectorDificultad.value as DificultadMemoria;
	juego = new JuegoMemoria(dificultadSeleccionada);

	pantallaResultado.classList.add("oculto");
	bloqueado = false;

	renderizar();
}

function renderizar(): void {
	const tablero = juego.obtenerTablero();

	// Ajustar el grid según dificultad
	const columnas = Math.sqrt(tablero.cartas.length);
	tableroEl.style.gridTemplateColumns = `repeat(${columnas}, minmax(50px, 80px))`;

	// Renderizar cartas
	tableroEl.innerHTML = tablero.cartas
		.map((carta) => {
			const clases = ["carta"];
			if (carta.estado === EstadoCarta.Revelada) clases.push("revelada");
			if (carta.estado === EstadoCarta.Emparejada) clases.push("emparejada");

			const contenido =
				carta.estado === EstadoCarta.Oculta ? "?" : carta.emoji;

			return `<div class="${clases.join(" ")}" data-id="${carta.id}">${contenido}</div>`;
		})
		.join("");

	// Actualizar estadísticas
	intentosEl.textContent = String(tablero.intentos);
	parejasEl.textContent = String(tablero.parejasEncontradas);
	totalParejasEl.textContent = String(tablero.totalParejas);

	// Asignar eventos a las cartas
	document.querySelectorAll(".carta").forEach((el) => {
		el.addEventListener("click", () => {
			const id = Number(el.getAttribute("data-id"));
			manejarClickCarta(id);
		});
	});
}

function manejarClickCarta(cartaId: number): void {
	if (bloqueado) return;

	const resultado = juego.seleccionarCarta(cartaId);

	switch (resultado) {
		case "carta-ya-revelada":
			return;

		case "primera-carta-seleccionada":
			renderizar();
			return;

		case "pareja-encontrada":
			renderizar();
			return;

		case "pareja-fallida":
			renderizar();
			bloqueado = true;
			setTimeout(() => {
				juego.ocultarCartasReveladas();
				bloqueado = false;
				renderizar();
			}, 1000);
			return;

		case "tablero-completado":
			renderizar();
			mostrarResultado();
			return;
	}
}

function mostrarResultado(): void {
	const puntuacion = juego.obtenerPuntuacion();

	pantallaResultado.classList.remove("oculto");
	pantallaResultado.innerHTML = `
		<h2>¡Felicitaciones!</h2>
		<p>Completaste el tablero</p>
		<p>Intentos: <strong>${puntuacion.intentos}</strong></p>
		<p>Tiempo: <strong>${puntuacion.tiempoSegundos}s</strong></p>
		<p>Puntaje final: <strong>${puntuacion.puntajeFinal}</strong></p>
		<button id="boton-jugar-de-nuevo">Jugar de nuevo</button>
	`;

	document.getElementById("boton-jugar-de-nuevo")?.addEventListener("click", iniciarJuego);
}

// Inicializar
botonReiniciar.addEventListener("click", iniciarJuego);
selectorDificultad.addEventListener("change", iniciarJuego);
iniciarJuego();