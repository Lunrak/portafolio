import type { Juego } from '../types';

type TarjetaJuegosProps = Omit<Juego, 'id'>;

function TarjetaJuego({
	titulo,
	descripcion,
	tecnologias,
	estado,
	enlace,
}: TarjetaJuegosProps) {
	const estadoTexto = {
		completado: '✅ Completado',
		'en-progreso': '🟡 En progreso',
		pendiente: '⚪ Pendiente',
	};

	return (
		<article className={`tarjeta-juego tarjeta-${estado}`}>
			<h3>{titulo}</h3>
			<p>{descripcion}</p>
			<div className="tecnologias">
				{tecnologias.map((tec) => (
					<span
						key={tec}
						className="tag"
					>
						{tec}
					</span>
				))}
			</div>
			<p className="estado">{estadoTexto[estado]}</p>
			{enlace && (
				<a
					href={enlace}
					className="boton"
					target="_blank"
					rel="noopener noreferrer"
				>
					Ver proyecto
				</a>
			)}
		</article>
	);
}

export default TarjetaJuego;
