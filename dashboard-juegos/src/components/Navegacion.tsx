import { NavLink } from 'react-router-dom';
import './Navegacion.css';
function Navegacion() {
	const claseNavLink = ({ isActive }: { isActive: boolean }) =>
		isActive ? 'enlace activo' : 'enlace';
	return (
		<nav className="navegacion">
			<div className="logo"> Dashboard</div>
			<ul>
				<li>
					<NavLink
						to="/"
						className={claseNavLink}
						end
					>
						Inicio
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/trivia"
						className={claseNavLink}
					>
						Trivia
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/acerca-de"
						className={claseNavLink}
					>
						Acerca de
					</NavLink>
				</li>
			</ul>
			🎮
		</nav>
	);
}
export default Navegacion;
