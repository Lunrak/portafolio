import { Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Trivia from './pages/Trivia';
import AcercaDe from './pages/AcercaDe';
import Navegacion from './components/Navegacion';
import './App.css';

function App() {
	return (
		<div className="app">
			<Navegacion />
			<main className="contenido">
				<Routes>
					<Route
						path="/"
						element={<Dashboard />}
					/>
					<Route
						path="/trivia"
						element={<Trivia />}
					/>
					<Route
						path="/acerca-de"
						element={<AcercaDe />}
					/>
					<Route
						path="*"
						element={
							<div className="no-encontrado">
								<h1>404 - Página no encontrada</h1>
							</div>
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
