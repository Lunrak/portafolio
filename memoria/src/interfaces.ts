export enum EstadoCarta {
	Oculta = "OCULTA",
	Revelada = "REVELADA",
	Emparejada = "EMPAREJADA",
}
export enum DificultadMemoria {
	Facil = "FACIL",
	// 4x4 = 16 cartas
	Normal = "NORMAL", // 6x6 = 36 cartas
	Dificil = "DIFICIL", // 8x8 = 64 cartas
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

//types para el juego
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
//funcion para obtener cartas por estado
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
	//base por dificultad
	const basePorDificultad: Record<DificultadMemoria, number> = {
		[DificultadMemoria.Facil]: 100,
		[DificultadMemoria.Normal]: 250,
		[DificultadMemoria.Dificil]: 500,
	};
	//bono por pocos intentos
	const bonificacionIntentos = Math.max(0, 100 - intentos * 5);
	//bonificacion por tiempo
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
