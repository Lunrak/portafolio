export enum EstadoJuego {
	Jugando = "JUGANDO",
	Ganado = "GANADO",
	Perdido = "PERDIDO",
}

export interface GameState {
	palabraSecreta: string;
	letrasAdivinadas: string[];
	letrasIncorrectas: string[];
	vidasRestantes: number;
	estado: EstadoJuego;
	dificultad: Dificultad;
}
export interface ConfiguracionJuego {
	readonly maxVidas: number;
	readonly palabras: readonly string[];
}

export interface LetraIntentada {
	letra: string;
	correcta: boolean;
	intentos: number;
}

export interface ResultadoJuego {
	ganado: boolean;
	palabra: string;
	intentosRealizados: number;
}

export enum Dificultad {
	Facil = "FACIL",
	Normal = "NORMAL",
	Dificil = "DIFICIL",
}

export type ResultadoIntento = "acierto" | "fallo" | "repetido";

export interface IntentoResultado {
	tipo: ResultadoIntento;
	letra: string;
	vidasRestantes: number;
}
