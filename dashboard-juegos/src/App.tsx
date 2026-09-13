import './App.css';
import TarjetaJuego from './components/TarjetaJuego';

function App() {
	const juegos = [
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
	];
	return (
		<div className="app">
			<header>
				<h1>Dashboard de Juegos</h1>
				<p>Mi colección de juegos desarrollados con React y TypeScript</p>
			</header>

			<main className="grid-juegos">
				{juegos.map((juego) => (
					<TarjetaJuego
						key={juego.id}
						titulo={juego.titulo}
						descripcion={juego.descripcion}
						tecnologias={juego.tecnologias}
						estado={juego.estado}
					/>
				))}
			</main>
		</div>
	);
}

export default App;
