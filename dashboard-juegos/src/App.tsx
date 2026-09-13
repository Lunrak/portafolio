import { useState } from 'react';
import './App.css';
import TarjetaJuego from './components/TarjetaJuego';
import Estadisticas from './components/Estadisticas';

interface Juego {
	id: number;
	titulo: string;
	descripcion: string;
	tecnologias: string[];
	estado: 'completado' | 'en-progreso' | 'pendiente';
	enlace?: string;
}

function App() {
	const juegos: Juego[] = [
		{
			id: 1,
			titulo: 'Juego del Ahorcado',
			descripcion: 'Juego clasico con canvas y logica tipada',
			tecnologias: ['HTML', 'CSS', 'TipeScript'],
			estado: 'completado' as const,
			enlace: '',
		},
		{
			id: 2,
			titulo: 'Juego de Memoria',
			descripcion: 'Encuentra las parejas de emojis en el monor tiempo posible',
			tecnologias: ['HTML', 'CSS', 'TypeScript'],
			estado: 'completado' as const,
			enlace: '',
		},
		{
			id: 3,
			titulo: 'Trivia Interactiva',
			descripcion: 'Juego de preguntas con puntuación y múltiples categorías.',
			tecnologias: ['React', 'TypeScript'],
			estado: 'en-progreso' as const,
		},
		{
			id: 4,
			titulo: 'Dashboard de Juegos',
			descripcion: 'Catálogo interactivo de mis proyectos de juegos.',
			tecnologias: ['React', 'TypeScript', 'Vite'],
			estado: 'en-progreso',
		},
	];

	//estados
	const [busqueda, setBusqueda] = useState('');
	const [filtro, setFiltro] = useState<
		'todos' | 'completado' | 'en-progreso' | 'pendiente'
	>('todos');

	//logica de filtro
	const juegosFiltrados = juegos.filter((juego) => {
		const coincideBusqueda =
			juego.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
			juego.descripcion.toLowerCase().includes(busqueda.toLowerCase());
		const coincideFiltro = filtro === 'todos' || juego.estado === filtro;
		return coincideBusqueda && coincideFiltro;
	});

	return (
		<div className="app">
			<header>
				<h1>Dashboard de Juegos</h1>
				<p>Mi colección de juegos desarrollados con React y TypeScript</p>
			</header>

			<section className="controles">
				<input
					type="text"
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
					placeholder="Buscar juegos"
					className="buscador"
				/>
			</section>

			<div className="filtros">
				<button
					className={"filtro ==='todos' ? 'activo':"}
					onClick={() => setFiltro('todos')}
				>
					Todos ({juegos.length}
				</button>
				<button
					className={"filtro==='completado'?'activo'"}
					onClick={() => setFiltro('completado')}
				>
					Completados ({juegos.filter((j) => j.estado === 'completado').length})
				</button>

				<button
					className={filtro === 'en-progreso' ? 'activo' : ''}
					onClick={() => setFiltro('en-progreso')}
				>
					En progreso ({juegos.filter((j) => j.estado === 'en-progreso').length}
					)
				</button>
				<button
					className={filtro === 'pendiente' ? 'activo' : ''}
					onClick={() => setFiltro('pendiente')}
				>
					Pendientes ({juegos.filter((j) => j.estado === 'pendiente').length})
				</button>
			</div>

			<Estadisticas
				total={juegos.length}
				completados={juegos.filter((j) => j.estado === 'completado').length}
				enProgreso={juegos.filter((j) => j.estado === 'en-progreso').length}
				pendientes={juegos.filter((j) => j.estado === 'pendiente').length}
			/>

			<div className="buscador-container">
				<input
					type="text"
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
					placeholder="Buscar juegos..."
					className="buscador"
					maxLength={50}
				/>
				<span className="contador-caracteres">{busqueda.length} / 50</span>
			</div>

			<div className="buscador-container">
				<input
					type="text"
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
					placeholder="Buscar juegos..."
					className="buscador"
					maxLength={50}
				/>
				<span className="contador-caracteres">{busqueda.length} / 50</span>
				{busqueda && (
					<button
						className="boton-limpiar"
						onClick={() => setBusqueda('')}
						aria-label="Limpiar búsqueda"
					>
						✕
					</button>
				)}
			</div>

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
