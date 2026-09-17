import './AcercaDe.css';
function AcercaDe() {
	return (
		<div className="acerca-de">
			<h1>Acerca de este proyecto</h1>
			<section>
				<h2>¿Qué es este Dashboard?</h2>
				<p>
					Este es mi catálogo personal de juegos desarrollados durante mi ruta
					de aprendizaje en desarrollo web. Combina HTML, CSS, JavaScript,
					TypeScript y React.
				</p>
			</section>
			<section>
				<h2>Tecnologías utilizadas</h2>
				<ul>
					<li>React 18 con TypeScript</li>
					<li>React Router para navegación</li>
					<li>Vite como bundler</li>
					<li>CSS Modules para estilos</li>
				</ul>
			</section>
			<section>
				<h2>Objetivo del proyecto</h2>
				<p>
					Aprender a construir aplicaciones React con múltiples páginas, manejo
					de estado, fetch de datos y rutas. Servirá como base para mi
					portafolio profesional.
				</p>
			</section>
		</div>
	);
}
export default AcercaDe;
