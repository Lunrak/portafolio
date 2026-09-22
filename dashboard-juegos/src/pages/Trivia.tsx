import { useState, useEffect } from 'react';
import './Trivia.css';

//Tipos
interface Pregunta {
	id: number;
	categoria: string;
	pregunta: string;
	opciones: string[];
	respuestaCorrecta: number;
}

type EstadoJuego = 'inicio' | 'jugando' | 'feedback' | 'finalizado';

type ResultadoRespuesta =
	| { tipo: 'correcto'; puntosGanados: number; indiceSeleccionado: number }
	| { tipo: 'incorrecto'; indiceSeleccionado: number }
	| { tipo: 'tiempo-agotado' };

//Constantes
const TIEMPO_POR_PREGUNTA = 15;
const PUNTOS_BASE = 100;

//Utilidad
function barajarArray<T>(array: T[]): T[] {
	const copia = [...array];
	for (let i = copia.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)!);
		[copia[i], copia[j]] = [copia[j]!, copia[i]!];
	}
	return copia;
}

//Componente

function Trivia() {
	const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [estado, setEstado] = useState<EstadoJuego>('inicio');
	const [indiceActual, setIndiceActual] = useState(0);
	const [puntuacion, setPuntuacion] = useState(0);
	const [tiempoRestante, SetTiempoRestante] = useState(TIEMPO_POR_PREGUNTA);
	const [resultadoActual, setResultadoActual] =
		useState<ResultadoRespuesta | null>(null);

	//Puntuacion Maxima
	const [puntuacionMaxima, setPuntuacionMaxima] = useState<number>(() => {
		return Number(localStorage.getItem('trivia-puntuacion-maxima') || '0');
	});

	const [nuevoRecord, setNuevoRecord] = useState(false);

	//Cargar preguntas
	useEffect(() => {
		async function cargarPreguntas() {
			try {
				setCargando(true);
				const respuesta = await fetch('/preguntas.json');
				if (!respuesta.ok) throw new Error('Error al cargar preguntas');
				const datos: Pregunta[] = await respuesta.json();
				setPreguntas(datos);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setCargando(false);
			}
		}
		cargarPreguntas();
	}, []);

	//Temporizador
	useEffect(() => {
		if (estado !== 'jugando') {
			return;
		}

		if (tiempoRestante === 0) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setResultadoActual({ tipo: 'tiempo-agotado' });
			setEstado('feedback');
			return;
		}

		const timer = setTimeout(() => {
			SetTiempoRestante((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [estado, tiempoRestante]);

	//Titulo
	useEffect(() => {
		if (estado === 'jugando') {
			document.title = '${tiempoRestante}s - Trivia';
		} else if (estado === 'finalizado') {
			document.title = '${puntuacion} puntos - Trivia';
		} else {
			document.title = 'Trivia Interactiva';
		}
	}, [estado, tiempoRestante, puntuacion]);

	//Acciones
	const iniciarJuego = () => {
		setPreguntas(barajarArray(preguntas));
		setEstado('jugando');
		setIndiceActual(0);
		setPuntuacion(0);
		SetTiempoRestante(TIEMPO_POR_PREGUNTA);
		setResultadoActual(null);
		setNuevoRecord(false);
	};

	const seleccionarRespuesta = (indice: number) => {
		if (estado !== 'jugando') {
			return;
		}

		const pregunta = preguntas[indiceActual]!;
		const esCorrecta = indice === pregunta.respuestaCorrecta;

		if (esCorrecta) {
			const puntosGanados = PUNTOS_BASE + tiempoRestante * 10;
			setResultadoActual({
				tipo: 'correcto',
				puntosGanados,
				indiceSeleccionado: indice,
			});
			setPuntuacion((prev) => prev + puntosGanados);
		} else {
			setResultadoActual({
				tipo: 'incorrecto',
				indiceSeleccionado: indice,
			});
		}

		setEstado('feedback');
	};

	const siguientePregunta = () => {
		const esUltima = indiceActual === preguntas.length - 1;

		if (esUltima) {
			finalizarJuego();
		} else {
			setIndiceActual((prev) => prev + 1);
			SetTiempoRestante(TIEMPO_POR_PREGUNTA);
			setResultadoActual(null);
			setEstado('jugando');
		}
	};

	const finalizarJuego = () => {
		setEstado('finalizado');

		//Actualizar record
		if (puntuacion > puntuacionMaxima) {
			setPuntuacionMaxima(puntuacion);
			localStorage.setItem('trivia-puntuacion-maxima', String(puntuacion));
			setNuevoRecord(true);
		}
	};

	//Renders

	if (cargando) {
		return (
			<div className="estado-carga">
				<div className="spinner"></div>
				<p>Cargando preguntas...</p>
			</div>
		);
	}
	if (error) {
		return (
			<div className="estado-error">
				<h2> {error}</h2>
			</div>
		);
	}

	if (preguntas.length === 0) {
		return (
			<div className="trivia">
				<p>No hay preguntas disponibles</p>
			</div>
		);
	}

	//Pantalla de inicio
	if (estado === 'inicio') {
		return (
			<div className="trivia">
				<div className="pantalla-incio">
					<h1>Juego de Trivia</h1>
					<p className="descripcion">
						Pon a prueba tus conocimentos con {preguntas.length} preguntas sobre
						desarrollo web
					</p>

					<div className="info-inicio">
						<div className="info-item">
							<span className="info-valor">{preguntas.length}</span>
							<span className="info-lavel">Preguntas</span>
						</div>
						<div className="info-item">
							<span className="info-valor">{TIEMPO_POR_PREGUNTA}</span>
							<span className="info-lavel">Por pregunta</span>
						</div>
						<div className="info-item">
							<span className="info-valor">{puntuacionMaxima}</span>
							<span className="info-lavel">Record</span>
						</div>
					</div>

					<button
						className="boton-principal"
						onClick={iniciarJuego}
					>
						Empezar a jugar
					</button>
				</div>
			</div>
		);
	}

	//Pnatalla de juego y feedback
	if (estado === 'jugando' || estado === 'feedback') {
		const pregunta = preguntas[indiceActual]!;
		const mostrarFeedback = estado === 'feedback' && resultadoActual;

		return (
			<div className="trivia">
				<header className="cabecera-juego">
					<div className="info-partida">
						<span>
							Pregunta {indiceActual + 1}/{preguntas.length}
						</span>
						<span className="puntuacion">{puntuacion}</span>
					</div>

					<div className="barra-tiempo">
						<div
							className={
								"barra-tiempo-relleno ${tiempoRestante<=5?'peligo':''}"
							}
							style={{
								width: '${((tiempoRestante/TIEMPO_POR_PREGUNTA)*100)%}',
							}}
						></div>

						<div className="tiempo-texto">{tiempoRestante}s</div>
					</div>
				</header>

				{/* Preguntas */}
				<div className="tarjeta-pregunta">
					<span className="categoria">{pregunta.categoria}</span>
					<h2>{pregunta.pregunta}</h2>
				</div>

				{/* Opciones */}
				<div className="opciones">
					{pregunta.opciones.map((opcion, indice) => {
						let clase = 'opcion';

						if (mostrarFeedback) {
							if (indice === pregunta.respuestaCorrecta) {
								clase += 'correcta';
							} else if (
								resultadoActual.tipo !== 'tiempo-agotado' &&
								indice === resultadoActual.indiceSeleccionado
							) {
								clase += 'incorrecta';
							}
						}

						return (
							<button
								key={indice}
								className={clase}
								onClick={() => seleccionarRespuesta(indice)}
								disabled={estado !== 'jugando'}
							>
								<span className="opcion-letra">
									{String.fromCharCode(65 + indice)}
								</span>
								{opcion}
							</button>
						);
					})}
				</div>

				{/* Feedback y boton siguiente */}
				{mostrarFeedback && (
					<div className={'feecback fedback-${resultadoActual.tipo}'}>
						{resultadoActual.tipo === 'correcto' && (
							<>
								<p className="feedback-titulo">Correcto</p>
								<p>
									Ganasete <strong>{resultadoActual.puntosGanados}</strong>
									puntos
								</p>
							</>
						)}
						{resultadoActual.tipo === 'incorrecto' && (
							<>
								<p className="feedback-titulo">Incorrecto</p>
								<p>
									La respuesta correcta era:{''}{' '}
									<strong>
										{pregunta.opciones[pregunta.respuestaCorrecta]}
									</strong>
								</p>
							</>
						)}

						<button
							className="boton-siguiente"
							onClick={siguientePregunta}
						>
							{indiceActual === preguntas.length - 1
								? 'Ver resultados'
								: 'Siguiente pregunta'}
						</button>
					</div>
				)}
			</div>
		);
	}

	// Pantalla final
	if (estado === 'finalizado') {
		const porcentaje = Math.round(
			(puntuacion / (preguntas.length * PUNTOS_BASE)) * 100,
		);

		return (
			<div className="trivia">
				<div className="pantalla-final">
					<h1>Juego Teminado</h1>
					{nuevoRecord && (
						<div className="nuevo-record">Nuevo record personal!</div>
					)}
					<div className="puntuacion-final">
						<span className="puntuacion-numero">{puntuacion}</span>
						<span className="puntuacion-lavel">puntos</span>
					</div>
					<div className="stat-final">
						<span className="puntuacion-numero">{puntuacionMaxima}</span>
						<span className="puntuacion-lavel">Record actual</span>
					</div>
					<div className="puntuacion-final">
						<span className="puntuacion-numero">{porcentaje}%</span>
						<span className="puntuacion-lavel">Precision maxima posible</span>
					</div>
				</div>

				<div className="botones-finales">
					<button
						className="boton-principal"
						onClick={iniciarJuego}
					>
						Jugar de nuevo
					</button>
				</div>
			</div>
		);
	}

	return null;
}
export default Trivia;
