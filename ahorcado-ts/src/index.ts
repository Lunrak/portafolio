import { GameState } from "./interfaces.js";
import { crearEstadoInicial, intentarLetra, CONFIG } from "./gameLogic.js";
import {
	actualizarPalabra,
	actualizarLetrasIncorrectas,
	actualizarVidas,
	mostrarResultado,
	ocultarResultado,
} from "./ui.js";
import { dibujarHorca, dibujarMuñeco } from "./canvas.js";
const canvas = document.getElementById("canvas-ahorcado") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
let estado: GameState = crearEstadoInicial();
function renderizar(): void {
	if (!ctx) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	dibujarHorca(ctx);
	dibujarMuñeco(ctx, estado.vidasRestantes, CONFIG.maxVidas);
	actualizarPalabra(estado);
	actualizarLetrasIncorrectas(estado);
	actualizarVidas(estado);
	if (estado.estado === "ganado" || estado.estado === "perdido") {
		mostrarResultado(estado);
	}
}
function inicializar(): void {
	estado = crearEstadoInicial();
	ocultarResultado();
	renderizar();
}
document.addEventListener("keydown", (evento: KeyboardEvent) => {
	if (estado.estado !== "jugando") return;
	const letra = evento.key.toLowerCase();
	if (!/^[a-zñ]$/.test(letra)) return;
	estado = intentarLetra(estado, letra);
	renderizar();
});
document
	.getElementById("boton-reiniciar")
	?.addEventListener("click", inicializar);
inicializar();
