import { useState, useEffect } from 'react';
import './App.css';
import TarjetaJuego from './components/TarjetaJuego';
import Estadisticas from './components/Estadisticas';
import type { Juego } from './types';

function App() {
	const [juegos, setJuegos] = useState<Juego[]>([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState<string | null>(null);

	//estados
	const [busqueda, setBusqueda] = useState('');
	const [filtro, setFiltro] = useState<
		'todos' | 'completado' | 'en-progreso' | 'pendiente'
	>(() => {
		const guardado = localStorage.getItem('filtroJuegos');
		return (
			(guardado as 'todos' | 'completado' | 'en-progreso' | 'pendiente') ||
			'todos'
		);
	});
	const [busquedaInput, setBusquedaInput] = useState('');
	const [busqueda, setBusqueda] = useState('');

	// Estado con valor inicial desde localStorage
	const [filtro, setFiltro] = useState<
		'todos' | 'completado' | 'en-progreso' | 'pendiente'
	>(() => {
		const guardado = localStorage.getItem('filtroJuegos');
		return (
			(guardado as 'todos' | 'completado' | 'en-progreso' | 'pendiente') ||
			'todos'
		);
	});

	useEffect(() => {
		document.title = `Dashboard (${juegosFiltrados.length} juegos)`;
	}, [juegosFiltrados.length]);

	// Guardar el filtro cuando cambie
	useEffect(() => {
		localStorage.setItem('filtroJuegos', filtro);
	}, [filtro]);

	//efecto de retardo

	useEffect(() => {
		const timer = setTimeout(() => {
			setBusqueda(busquedaInput);
		}, 400);

		return () => clearTimeout(timer);
	}, [busquedaInput]);

	//cargar juegos
	useEffect(() => {
		async function cargarJuegos() {
			try {
				setCargando(true);
				const respuesta = await fetch('/juegos.json');

				if (!respuesta.ok) {
					throw new Error(
						'Error ${respuesta.status}: no se pudieron cargar los juegos',
					);
				}

				const datos: Juego[] = await respuesta.json();
				setJuegos(datos);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setCargando(false);
			}
		}

		cargarJuegos();
	}, []);

	//logica de filtro
	const juegosFiltrados = juegos.filter((juego) => {
		const coincideBusqueda =
			juego.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
			juego.descripcion.toLowerCase().includes(busqueda.toLowerCase());
		const coincideFiltro = filtro === 'todos' || juego.estado === filtro;
		return coincideBusqueda && coincideFiltro;
	});

	//carga y error
	if (cargando) {
		return (
			<div className="app">
				<div className="estado-carga">
					<div className="spinner"></div>
					<p>Cargando juegos ...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="app">
				<div className="estado-error">
					<h2>Error</h2>
					<p>{error}</p>
					<button onClick={() => window.location.reload()}>Reintentar</button>
				</div>
			</div>
		);
	}

	return (
		<div className="app">
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
						placeholder="Buscar juegos"
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
								setBusqueda();
							}}
							aria-label="Limpiar busqueda"
						>
							Limpiar
						</button>
					)}
				</div>

				<div className="filtros">
					<button
						className={filtro === 'todos' ? 'activo' : ''}
						onClick={() => setFiltro('todos')}
					>
						Todos ({juegos.length})
					</button>
					<button
						className={filtro === 'completado' ? 'activo' : ''}
						onClick={() => setFiltro('completado')}
					>
						Completado ({juegos.filter((j) => j.estado === 'completado').length}
						)
					</button>
					<button
						className={filtro === 'en-progreso' ? 'activo' : ''}
						onClick={() => setFiltro('en-progreso')}
					>
						En progreso (
						{juegos.filter((j) => j.estado === 'en-progreso').length})
					</button>
					<button
						className={filtro === 'pendiente' ? 'activo' : ''}
						onClick={() => setFiltro('pendiente')}
					>
						pendiente ({juegos.filter((j) => j.estado === 'pendiente').length})
					</button>
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
					juegos.map((juego) => (
						<TarjetaJuego
							key={juego.id}
							titulo={juego.titulo}
							descripcion={juego.descripcion}
							tecnologias={juego.tecnologias}
							estado={juego.estado}
						/>
					))
				) : (
					<p className="sin-resultados">
						No se encontraron juegos con esos criterios
					</p>
				)}
			</main>
		</div>
	);
}

export default App;
