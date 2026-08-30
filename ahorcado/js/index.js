// Archivo principal que orquesta todo
import { CONFIG } from "./config.js";
import {
    crearEstadoInicial,
    intentarLetra,
    esLetraValida
} from "./gameLogic.js";
import {
    dibujarHorca,
    dibujarMuneco,
    limpiarCanvas
} from "./canvas.js";
import {
    actualizarPalabra,
    actualizarLetrasIncorrectas,
    actualizarVidas,
    mostrarVictoria,
    mostrarDerrota,
    ocultarPantallaResultado
} from "./ui.js";

// Obtener el canvas y su contexto
const canvas = document.getElementById("canvas-ahorcado");
const ctx = canvas.getContext("2d");

// Estado actual del juego
let estado = crearEstadoInicial();

// Inicializar el juego
function inicializar() {
    estado = crearEstadoInicial();
    ocultarPantallaResultado();
    renderizar();
}

// Renderizar todo el estado actual
function renderizar() {
    // Limpiar canvas
    limpiarCanvas(ctx, canvas);

    // Dibujar en canvas
    dibujarHorca(ctx);
    dibujarMuneco(ctx, estado.vidasRestantes, CONFIG.maxVidas);

    // Actualizar UI
    actualizarPalabra(estado);
    actualizarLetrasIncorrectas(estado);
    actualizarVidas(estado);

    // Comprobar fin del juego
    if (estado.estado === "ganado") {
        mostrarVictoria(estado);
    } else if (estado.estado === "perdido") {
        mostrarDerrota(estado);
    }
}

// Manejar entrada del teclado
document.addEventListener("keydown", (evento) => {
    // Solo procesar si el juego está activo
    if (estado.estado !== "jugando") {
        return;
    }

    // Obtener la letra presionada
    const letra = evento.key;

    // Solo procesar letras válidas
    if (!esLetraValida(letra)) {
        return;
    }

    // Intentar la letra
    estado = intentarLetra(estado, letra);
    renderizar();
});

// Botón de reinicio
document.getElementById("boton-reiniciar").addEventListener("click", inicializar);

// Iniciar el juego
inicializar();

console.log("🎯 Juego del Ahorcado iniciado correctamente!");
console.log(`📝 Palabra secreta: ${estado.palabraSecreta}`);
console.log(`❤️ Vidas: ${estado.vidasRestantes}`);