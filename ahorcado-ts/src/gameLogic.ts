import { GameState, ConfiguracionJuego, EstadoJuego } from "./intterfaces.ts";

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


