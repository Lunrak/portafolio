interface EstadisticasProps {
	total: number;
	completados: number;
	enProgreso: number;
	pendientes: number;
}
function Estadisticas({
	total,
	completados,
	enProgreso,
	pendientes,
}: EstadisticasProps) {
	return (
		<div className="estadisticas">
			<div className="stat">
				<span className="stat-numero">{total}</span>
				<span className="stat-label">Total</span>
			</div>
			<div className="stat">
				<span className="stat-numero completado">{completados}</span>
				<span className="stat-label">Completados</span>
			</div>
			<div className="stat">
				<span className="stat-numero en-progreso">{enProgreso}</span>
				<span className="stat-label">En progreso</span>
			</div>
			<div className="stat">
				<span className="stat-numero pendiente">{pendientes}</span>
				<span className="stat-label">Pendientes</span>
			</div>
		</div>
	);
}
export default Estadisticas;
