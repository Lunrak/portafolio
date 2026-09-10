import { barajarArray } from "./utils.js";
export enum EstadoCarta {
	Oculta = "OCULTA",
	Revelada = "REVELADA",
	Emparejada = "EMPAREJADA",
}

export enum DificultadMemoria {
	Facil = "FACIL",
	Normal = "NORMAL",
	Dificil = "DIFICIL",
}

export interface Carta {
	id: number;
	emoji: string;
	estado: EstadoCarta;
	parejaId: number;
}

export interface Tablero {
	cartas: Carta[];
	parejasEncontradas: number;
	totalParejas: number;
	intentos: number;
	dificultad: DificultadMemoria;
	completado: boolean;
}

export type TableroActualizable = Partial<
	Pick<Tablero, "intentos" | "completado">
>;
export type CartasResumen = Pick<Carta, "id" | "emoji" | "estado">;
export type CartasPorEstado = Record<EstadoCarta, Carta[]>;

export type ResultadoSeleccion =
	| "primera-carta-seleccionada"
	| "segunda-carta-seleccionada"
	| "carta-ya-revelada"
	| "pareja-encontrada"
	| "pareja-fallida"
	| "tablero-completado";

export function obtenerCartasPorEstado(tablero: Tablero): CartasPorEstado {
	const resultado: CartasPorEstado = {
		[EstadoCarta.Oculta]: [],
		[EstadoCarta.Revelada]: [],
		[EstadoCarta.Emparejada]: [],
	};

	tablero.cartas.forEach((carta) => {
		resultado[carta.estado].push(carta);
	});

	return resultado;
}

export interface Puntuacion {
	intentos: number;
	tiempoSegundos: number;
	dificultad: DificultadMemoria;
	puntajeFinal: number;
}

export function calcularPuntuacion(
	intentos: number,
	tiempoSegundos: number,
	dificultad: DificultadMemoria,
): Puntuacion {
	const basePorDificultad: Record<DificultadMemoria, number> = {
		[DificultadMemoria.Facil]: 100,
		[DificultadMemoria.Normal]: 250,
		[DificultadMemoria.Dificil]: 500,
	};

	const bonificacionIntentos = Math.max(0, 100 - intentos * 5);
	const bonificacionTiempo = tiempoSegundos < 60 ? 50 : 0;

	const puntajeFinal =
		basePorDificultad[dificultad] + bonificacionIntentos + bonificacionTiempo;

	return {
		intentos,
		tiempoSegundos,
		dificultad,
		puntajeFinal,
	};
}