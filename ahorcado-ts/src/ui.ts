import { GameState } from "./interfaces.js";
import { obtenerPalabraEnmascarada } from "./gameLogic.js";
export function actualizarPalabra(estado: GameState): void {
	const elemento = document.getElementById("palabra-secreta");
	if (elemento) {
		elemento.textContent = obtenerPalabraEnmascarada(estado);
	}
}
export function actualizarLetrasIncorrectas(estado: GameState): void {
	const elemento = document.getElementById("letras-incorrectas");
	if (elemento) {
		elemento.textContent = estado.letrasIncorrectas
			.map((letra) => letra.toUpperCase())
			.join(" ");
	}
}
export function actualizarVidas(estado: GameState): void {
	const elemento = document.getElementById("vidas-restantes");
	if (elemento) {
		elemento.textContent = `Vidas: ${estado.vidasRestantes}`;
	}
}
export function mostrarResultado(estado: GameState): void {
	const pantalla = document.getElementById("pantalla-resultado");
	if (!pantalla) return;
	pantalla.classList.remove("oculto");
	if (estado.estado === "ganado") {
		pantalla.classList.add("victoria");
		pantalla.textContent = `¡GANASTE! La palabra era: ${estado.palabraSecreta.toUpperCase()}`;
	} else if (estado.estado === "perdido") {
		pantalla.classList.add("derrota");
		pantalla.textContent = `PERDISTE. La palabra era: ${estado.palabraSecreta.toUpperCase()}`;
	}
}
export function ocultarResultado(): void {
	const pantalla = document.getElementById("pantalla-resultado");
	if (pantalla) {
		pantalla.classList.add("oculto");
		pantalla.classList.remove("victoria", "derrota");
	}
}
