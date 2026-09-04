export type EstadoJuego = "jugando" | "ganado" | "perdido";

export interface GameState {
	palabraSecreta: string[];
	letrasAdivinadas: string[];
	letrasIncorrectas: string[];
	vidasRestantes: number;
	estado: EstadoJuego;
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
