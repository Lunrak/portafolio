import { useState, useEffect } from 'react';
import TarjetaJuego from '../components/TarjetaJuego';
import Estadisticas from '../components/Estadisticas';
import type { Juego } from '../types';
import './Dashboard.css';
function Dashboard() {
	const [juegos, setJuegos] = useState<Juego[]>([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [busquedaInput, setBusquedaInput] = useState('');
	const [busqueda, setBusqueda] = useState('');
	const [filtro, setFiltro] = useState<
		'todos' | 'completado' | 'en-progreso' | 'pendiente'
	>('todos');
	useEffect(() => {
		async function cargarJuegos() {
			try {
				setCargando(true);
				const respuesta = await fetch('/juegos.json');
				if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
				const datos: Juego[] = await respuesta.json();
				setJuegos(datos);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setCargando(false);
			}
		}
		cargarJuegos();
	}, []);
	useEffect(() => {
		const timer = setTimeout(() => setBusqueda(busquedaInput), 400);
		return () => clearTimeout(timer);
	}, [busquedaInput]);
	const juegosFiltrados = juegos.filter((juego) => {
		const coincideBusqueda =
			juego.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
			juego.descripcion.toLowerCase().includes(busqueda.toLowerCase());
		const coincideFiltro = filtro === 'todos' || juego.estado === filtro;
		return coincideBusqueda && coincideFiltro;
	});
	if (cargando) {
		return (
			<div className="estado-carga">
				<div className="spinner"></div>
				<p>Cargando juegos...</p>
			</div>
		);
	}
	if (error) {
		return (
			<div className="estado-error">
				<h2> Error</h2>
				<p>{error}</p>❌
				<button onClick={() => window.location.reload()}>Reintentar</button>
			</div>
		);
	}
	return (
		<div className="dashboard">
			<header>
				<h1>Dashboard de Juegos</h1>
				<p>Mi colección de juegos desarrollados con React y TypeScript</p>
			</header>
			<section className="controles">
				<div className="buscador-container">
					<input
						type="text"
						value={busquedaInput}
						onChange={(e) => setBusquedaInput(e.target.value)}
						placeholder="Buscar juegos..."
						className="buscador"
						maxLength={50}
					/>
					<span className="contador-caracteres">
						{busquedaInput.length} / 50
					</span>
					{busquedaInput && (
						<button
							className="boton-limpiar"
							onClick={() => {
								setBusquedaInput('');
								setBusqueda('');
							}}
						>
							✕
						</button>
					)}
				</div>
				<div className="filtros">
					{(['todos', 'completado', 'en-progreso', 'pendiente'] as const).map(
						(f) => (
							<button
								key={f}
								className={filtro === f ? 'activo' : ''}
								onClick={() => setFiltro(f)}
							>
								{f === 'todos'
									? 'Todos'
									: f === 'completado'
										? 'Completados'
										: f === 'en-progreso'
											? 'En progreso'
											: 'Pendientes'}{' '}
								(
								{f === 'todos'
									? juegos.length
									: juegos.filter((j) => j.estado === f).length}
								)
							</button>
						),
					)}
				</div>
			</section>
			<Estadisticas
				total={juegos.length}
				completados={juegos.filter((j) => j.estado === 'completado').length}
				enProgreso={juegos.filter((j) => j.estado === 'en-progreso').length}
				pendientes={juegos.filter((j) => j.estado === 'pendiente').length}
			/>
			<main className="grid-juegos">
				{juegosFiltrados.length > 0 ? (
					juegosFiltrados.map((juego) => (
						<TarjetaJuego
							key={juego.id}
							titulo={juego.titulo}
							descripcion={juego.descripcion}
							tecnologias={juego.tecnologias}
							estado={juego.estado}
							enlace={juego.enlace}
						/>
					))
				) : (
					<p className="sin-resultados">
						No se encontraron juegos con esos criterios.
					</p>
				)}
			</main>
		</div>
	);
}
export default Dashboard;
