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
export type ResultadoSeleccion =
	| "primera-carta-seleccionada"
	| "segunda-carta-seleccionada"
	| "carta-ya-revelada"
	| "pareja-encontrada"
	| "pareja-fallida"
	| "tablero-completado";
