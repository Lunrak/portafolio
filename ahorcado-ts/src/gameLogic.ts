import { GameState, ConfiguracionJuego, EstadoJuego } from "./interfaces.js";
export const CONFIG: ConfiguracionJuego = {
	maxVidas: 6,
	palabras: [
		"javascript",
		"programacion",
		"desarrollo",
		"computadora",
		"teclado",
		"monitor",
		"internet",
		"videojuego",
	],
};
export function crearEstadoInicial(): GameState {
	const indiceAleatorio = Math.floor(Math.random() * CONFIG.palabras.length);
	const palabraSecreta = CONFIG.palabras[indiceAleatorio];
	return {
		palabraSecreta,
		letrasAdivinadas: [],
		letrasIncorrectas: [],
		vidasRestantes: CONFIG.maxVidas,
		estado: "jugando",
	};
}
export function intentarLetra(estado: GameState, letra: string): GameState {
	// Normalizar letra
	const letraNormalizada = letra.toLowerCase();
	// Comprobar si ya fue intentada
	if (
		estado.letrasAdivinadas.includes(letraNormalizada) ||
		estado.letrasIncorrectas.includes(letraNormalizada)
	) {
		return { ...estado };
	}
	// Si la letra está en la palabra
	if (estado.palabraSecreta.includes(letraNormalizada)) {
		const letrasAdivinadas = [...estado.letrasAdivinadas, letraNormalizada];
		const estadoNuevo: GameState = {
			...estado,
			letrasAdivinadas,
		};
		// Comprobar victoria
		const palabraCompletada = estado.palabraSecreta
			.split("")
			.every((letraPalabra) => letrasAdivinadas.includes(letraPalabra));
		if (palabraCompletada) {
			return { ...estadoNuevo, estado: "ganado" };
		}
		return estadoNuevo;
	}
	// Si la letra NO está en la palabra
	const letrasIncorrectas = [...estado.letrasIncorrectas, letraNormalizada];
	const vidasRestantes = estado.vidasRestantes - 1;
	const estadoNuevo: GameState = {
		...estado,
		letrasIncorrectas,
		vidasRestantes,
	};
	// Comprobar derrota
	if (vidasRestantes <= 0) {
		return { ...estadoNuevo, estado: "perdido" };
	}
	return estadoNuevo;
}
export function obtenerPalabraEnmascarada(estado: GameState): string {
	return estado.palabraSecreta
		.split("")
		.map((letra) => (estado.letrasAdivinadas.includes(letra) ? letra : "_"))
		.join(" ");
}
export function crearResultado(estado: GameState): ResultadoJuego {
	return {
		ganado: estado.estado === "ganado",
		palabra: estado.palabraSecreta,
		intentosRealizados:
			estado.letrasAdivinadas.length + estado.letrasIncorrectas.length,
	};
}
