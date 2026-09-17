import { useState, useEffect } from 'react';
import './Trivia.css';
interface Pregunta {
	id: number;
	categoria: string;
	pregunta: string;
	opciones: string[];
	respuestaCorrecta: number;
}
function Trivia() {
	const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState<string | null>(null);
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
	if (cargando)
		return (
			<div className="estado-carga">
				<div className="spinner"></div>
				<p>Cargando preguntas...</p>
			</div>
		);
	if (error)
		return (
			<div className="estado-error">
				<h2> {error}</h2>
			</div>
		);

	return (
		<div className="trivia">
			<header>
				<h1>Juego de Trivia</h1>
				<p>Total de preguntas cargadas: {preguntas.length}</p>
			</header>
			🚧
			<p className="aviso-proximo">
				Juego en construcción. Mañana añadiremos la lógica completa.
			</p>
		</div>
	);
}
export default Trivia;
