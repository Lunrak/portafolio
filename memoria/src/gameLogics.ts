import {
	Carta,
	Tablero,
	EstadoCarta,
	DificultadMemoria,
	ResultadoSeleccion,
} from "./interfaces.js";
import { barajarArray } from "./utils.js";
const EMOJIS: readonly string[] = [
	"🍎",
	"🎮",
	"🚗",
	"🏆",
	"⭐",
	"🎨",
	"🎵",
	"🍕",
	"🌍",
	"🚀",
	"🎯",
	"💎",
	"⚽",
	"🐱",
	"🎲",
	"🐶",
	"📚",
	"🦊",
	"🌈",
	"🐼",
	"🔥",
	"🦁",
	"🌺",
	"🐸",
	"👾",
	"🦄",
	"🤖",
	"🐲",
	"👻",
	"🎃",
	"🎪",
	"🎭",
];
export const CONFIG_MEMORIA: Record<DificultadMemoria, { columnas: number; filas:
number }> = {
[DificultadMemoria.Facil]: { columnas: 4, filas: 4 },
[DificultadMemoria.Normal]: { columnas: 6, filas: 6 },
[DificultadMemoria.Dificil]: { columnas: 8, filas: 8 }
};
export function crearTablero(dificultad: DificultadMemoria = DificultadMemoria.Facil): Tablero {
const { columnas, filas } = CONFIG_MEMORIA[dificultad];
const totalCartas = columnas * filas;
const totalParejas = totalCartas / 2;
// Usar función genérica para barajar
const emojisBarajados = barajarArray([...EMOJIS]);
const emojisSeleccionados = emojisBarajados.slice(0, totalParejas);
// Crear cartas
const cartas: Carta[] = [];
let id = 0;
for (let i = 0; i < totalParejas; i++) {
const parejaId = i;
for (let j = 0; j < 2; j++) {
cartas.push({
id: id++,
emoji: emojisSeleccionados[i],
estado: EstadoCarta.Oculta,
parejaId
});
}
}
export function seleccionarCarta(
	tablero: Tablero,
	cartaId: number,
	cartaSeleccionadaPrevia: Carta | null,
): { tablero: Tablero; resultado: ResultadoSeleccion; carta: Carta | null } {
	const carta = tablero.cartas.find((c) => c.id === cartaId);
	if (!carta) {
		return { tablero, resultado: "carta-ya-revelada", carta: null };
	}
	if (
		carta.estado === EstadoCarta.Revelada ||
		carta.estado === EstadoCarta.Emparejada
	) {
		return { tablero, resultado: "carta-ya-revelada", carta: null };
	}
	// Revelar la carta
	const cartasActualizadas = tablero.cartas.map((c) =>
		c.id === cartaId ? { ...c, estado: EstadoCarta.Revelada } : c,
	);
	const tableroActualizado: Tablero = {
		...tablero,
		cartas: cartasActualizadas,
		intentos: tablero.intentos + 1,
	};
	// Si no hay carta previa seleccionada
	if (!cartaSeleccionadaPrevia) {
		return {
			tablero: tableroActualizado,
			resultado: "primera-carta-seleccionada",
			carta,
		};
	}
	// Si hay carta previa, comprobar pareja
	if (cartaSeleccionadaPrevia.parejaId === carta.parejaId) {
		// ¡Pareja encontrada!
		const cartasEmparejadas = tableroActualizado.cartas.map((c) =>
			c.id === cartaId || c.id === cartaSeleccionadaPrevia.id
				? { ...c, estado: EstadoCarta.Emparejada }
				: c,
		);
		const parejasEncontradas = tableroActualizado.parejasEncontradas + 1;
		const completado = parejasEncontradas === tableroActualizado.totalParejas;
		return {
			tablero: {
				...tableroActualizado,
				cartas: cartasEmparejadas,
				parejasEncontradas,
				completado,
			},
			resultado: completado ? "tablero-completado" : "pareja-encontrada",
			carta,
		};
	}
	// No son pareja
	return {
		tablero: tableroActualizado,
		resultado: "pareja-fallida",
		carta,
	};
}
export function ocultarCartasReveladas(tablero: Tablero): Tablero {
	return {
		...tablero,
		cartas: tablero.cartas.map((c) =>
			c.estado === EstadoCarta.Revelada
				? { ...c, estado: EstadoCarta.Oculta }
				: c,
		),
	};
}
