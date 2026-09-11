import {
	Carta,
	Tablero,
	EstadoCarta,
	DificultadMemoria,
	ResultadoSeleccion,
	Puntuacion,
	calcularPuntuacion,
} from "./interfaces.js";
import { barajarArray } from "./utils.js";

export class JuegoMemoria {
	private tablero: Tablero;
	private cartaSeleccionadaPrevia: Carta | null = null;
	private tiempoInicio: number = 0;
	private tiempoFin: number = 0;

	constructor(dificultad: DificultadMemoria = DificultadMemoria.Facil) {
		this.tablero = this.crearTablero(dificultad);
		this.tiempoInicio = Date.now();
	}

	private crearTablero(dificultad: DificultadMemoria): Tablero {
		const config: Record<
			DificultadMemoria,
			{ columnas: number; filas: number }
		> = {
			[DificultadMemoria.Facil]: { columnas: 4, filas: 4 },
			[DificultadMemoria.Normal]: { columnas: 6, filas: 6 },
			[DificultadMemoria.Dificil]: { columnas: 8, filas: 8 },
		};

		const { columnas, filas } = config[dificultad];
		const totalParejas = (columnas * filas) / 2;

		const emojisDisponibles = [
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

		const emojisSeleccionados = barajarArray([...emojisDisponibles]).slice(
			0,
			totalParejas,
		);

		const cartas: Carta[] = [];
		let id = 0;

		for (let i = 0; i < totalParejas; i++) {
			for (let j = 0; j < 2; j++) {
				cartas.push({
					id: id++,
					emoji: emojisSeleccionados[i]!,
					estado: EstadoCarta.Oculta,
					parejaId: i,
				});
			}
		}

		return {
			cartas: barajarArray(cartas),
			parejasEncontradas: 0,
			totalParejas,
			intentos: 0,
			dificultad,
			completado: false,
		};
	}

	public seleccionarCarta(cartaId: number): ResultadoSeleccion {
		const carta = this.tablero.cartas.find((c) => c.id === cartaId);

		if (!carta || carta.estado !== EstadoCarta.Oculta) {
			return "carta-ya-revelada";
		}

		// Revelar la carta
		carta.estado = EstadoCarta.Revelada;

		// Primera carta seleccionada
		if (!this.cartaSeleccionadaPrevia) {
			this.cartaSeleccionadaPrevia = carta;
			return "primera-carta-seleccionada";
		}

		// Segunda carta: comprobar pareja
		this.tablero.intentos++;

		if (this.cartaSeleccionadaPrevia.parejaId === carta.parejaId) {
			// ¡Pareja!
			this.cartaSeleccionadaPrevia.estado = EstadoCarta.Emparejada;
			carta.estado = EstadoCarta.Emparejada;
			this.tablero.parejasEncontradas++;
			this.cartaSeleccionadaPrevia = null;

			if (this.tablero.parejasEncontradas === this.tablero.totalParejas) {
				this.tablero.completado = true;
				this.tiempoFin = Date.now();
				return "tablero-completado";
			}

			return "pareja-encontrada";
		}

		// No son pareja: dejamos la carta previa para ocultarla después
		return "pareja-fallida";
	}

	public ocultarCartasReveladas(): void {
		this.tablero.cartas.forEach((carta) => {
			if (carta.estado === EstadoCarta.Revelada) {
				carta.estado = EstadoCarta.Oculta;
			}
		});
		this.cartaSeleccionadaPrevia = null;
	}

	public obtenerTablero(): Readonly<Tablero> {
		return this.tablero;
	}

	public estaCompletado(): boolean {
		return this.tablero.completado;
	}

	public obtenerPuntuacion(): Puntuacion {
		const tiempoSegundos = Math.floor(
			(this.tiempoFin - this.tiempoInicio) / 1000,
		);

		return calcularPuntuacion(
			this.tablero.intentos,
			tiempoSegundos,
			this.tablero.dificultad,
		);
	}
}
