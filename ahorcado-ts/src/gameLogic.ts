import {
	GameState,
	ConfiguracionJuego,
	EstadoJuego,
	Dificultad,
	IntentoResultado,
	ResultadoIntento,
} from "./interfaces.js";
export const CONFIG = {
	maxVidas: {
		[Dificultad.Facil]: 8,
		[Dificultad.Normal]: 6,
		[Dificultad.Dificil]: 4,
	},
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
} as const;
export function crearEstadoInicial(
	dificultad: Dificultad = Dificultad.Normal,
): GameState {
	const indiceAleatorio = Math.floor(Math.random() * CONFIG.palabras.length);
	// const palabraSecreta = CONFIG.palabras[indiceAleatorio];

	return {
		palabraSecreta: CONFIG.palabras[indiceAleatorio],
		letrasAdivinadas: [],
		letrasIncorrectas: [],
		vidasRestantes: CONFIG.maxVidas[dificultad],
		estado: EstadoJuego.Jugando,
		dificultad,
	};
}

export function intentarLetra(
	estado: GameState,
	letra: string,
): IntentoResultado {
	// Normalizar letra
	const letraNormalizada = letra.toLowerCase();
	// Comprobar si ya fue intentada
	if (
		estado.letrasAdivinadas.includes(letraNormalizada) ||
		estado.letrasIncorrectas.includes(letraNormalizada)
	) {
		return {
			tipo: "repetido",
			letra: letraNormalizada,
			vidasRestantes: estado.vidasRestantes,
		};
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
			.every((letraPalabra: any) => letrasAdivinadas.includes(letraPalabra));
		if (palabraCompletada) {
			estadoNuevo.estado = EstadoJuego.Ganado;
		}
		return {
			tipo: "acierto",
			letra: letraNormalizada,
			vidasRestantes: estadoNuevo.vidasRestantes,
		};
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
		estadoNuevo.estado = EstadoJuego.Perdido;
	}
	return {
		tipo: "fallo",
		letra: letraNormalizada,
		vidasRestantes,
	};
}
export function obtenerPalabraEnmascarada(estado: GameState): string {
	return estado.palabraSecreta
		.split("")
		.map((letra: string) =>
			estado.letrasAdivinadas.includes(letra) ? letra : "_",
		)
		.join(" ");
}
// export function crearResultado(estado: GameState): ResultadoJuego {
// 	return {
// 		ganado: estado.estado === "ganado",
// 		palabra: estado.palabraSecreta,
// 		intentosRealizados:
// 			estado.letrasAdivinadas.length + estado.letrasIncorrectas.length,
// 	};
// }
