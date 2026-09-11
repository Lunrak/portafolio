import { JuegoMemoria } from "./JuegoMemoria.js";
import { EstadoCarta } from "./interfaces.js";
const tableroEl = document.getElementById("tablero");
const intentosEl = document.getElementById("intentos");
const parejasEl = document.getElementById("parejas");
const totalParejasEl = document.getElementById("total-parejas");
const botonReiniciar = document.getElementById("boton-reiniciar");
const selectorDificultad = document.getElementById("dificultad");
const pantallaResultado = document.getElementById("pantalla-resultado");
let juego;
let bloqueado = false;
function iniciarJuego() {
    const dificultadSeleccionada = selectorDificultad.value;
    juego = new JuegoMemoria(dificultadSeleccionada);
    pantallaResultado.classList.add("oculto");
    bloqueado = false;
    renderizar();
}
function renderizar() {
    const tablero = juego.obtenerTablero();
    // Ajustar el grid según dificultad
    const columnas = Math.sqrt(tablero.cartas.length);
    tableroEl.style.gridTemplateColumns = `repeat(${columnas}, minmax(50px, 80px))`;
    // Renderizar cartas
    tableroEl.innerHTML = tablero.cartas
        .map((carta) => {
        const clases = ["carta"];
        if (carta.estado === EstadoCarta.Revelada)
            clases.push("revelada");
        if (carta.estado === EstadoCarta.Emparejada)
            clases.push("emparejada");
        const contenido = carta.estado === EstadoCarta.Oculta ? "?" : carta.emoji;
        return `<div class="${clases.join(" ")}" data-id="${carta.id}">${contenido}</div>`;
    })
        .join("");
    // Actualizar estadísticas
    intentosEl.textContent = String(tablero.intentos);
    parejasEl.textContent = String(tablero.parejasEncontradas);
    totalParejasEl.textContent = String(tablero.totalParejas);
    // Asignar eventos a las cartas
    document.querySelectorAll(".carta").forEach((el) => {
        el.addEventListener("click", () => {
            const id = Number(el.getAttribute("data-id"));
            manejarClickCarta(id);
        });
    });
}
function manejarClickCarta(cartaId) {
    if (bloqueado)
        return;
    const resultado = juego.seleccionarCarta(cartaId);
    switch (resultado) {
        case "carta-ya-revelada":
            return;
        case "primera-carta-seleccionada":
            renderizar();
            return;
        case "pareja-encontrada":
            renderizar();
            return;
        case "pareja-fallida":
            renderizar();
            bloqueado = true;
            setTimeout(() => {
                juego.ocultarCartasReveladas();
                bloqueado = false;
                renderizar();
            }, 1000);
            return;
        case "tablero-completado":
            renderizar();
            mostrarResultado();
            return;
    }
}
function mostrarResultado() {
    const puntuacion = juego.obtenerPuntuacion();
    pantallaResultado.classList.remove("oculto");
    pantallaResultado.innerHTML = `
		<h2>¡Felicitaciones!</h2>
		<p>Completaste el tablero</p>
		<p>Intentos: <strong>${puntuacion.intentos}</strong></p>
		<p>Tiempo: <strong>${puntuacion.tiempoSegundos}s</strong></p>
		<p>Puntaje final: <strong>${puntuacion.puntajeFinal}</strong></p>
		<button id="boton-jugar-de-nuevo">Jugar de nuevo</button>
	`;
    document.getElementById("boton-jugar-de-nuevo")?.addEventListener("click", iniciarJuego);
}
// Inicializar
botonReiniciar.addEventListener("click", iniciarJuego);
selectorDificultad.addEventListener("change", iniciarJuego);
iniciarJuego();
