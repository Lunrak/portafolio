// Actualización de la interfaz de usuario (DOM)
import { obtenerPalabraEnmascarada } from "./gameLogic.js";

// Actualizar la palabra mostrada
export function actualizarPalabra(estado) {
    const elementoPalabra = document.getElementById("palabra-secreta");
    const palabraEnmascarada = obtenerPalabraEnmascarada(estado);
    // Mostrar con espacios entre letras para mejor legibilidad
    elementoPalabra.textContent = palabraEnmascarada.split("").join(" ");
}

// Actualizar letras incorrectas
export function actualizarLetrasIncorrectas(estado) {
    const elementoLetras = document.getElementById("letras-incorrectas");
    elementoLetras.textContent = estado.letrasIncorrectas
        .map(letra => letra.toUpperCase())
        .join(" ");
}

// Actualizar vidas restantes
export function actualizarVidas(estado) {
    const elementoVidas = document.getElementById("vidas-restantes");
    elementoVidas.textContent = estado.vidasRestantes;
}

// Mostrar pantalla de victoria
export function mostrarVictoria(estado) {
    const pantalla = document.getElementById("pantalla-resultado");
    pantalla.classList.remove("oculto");
    pantalla.classList.remove("derrota");
    pantalla.classList.add("victoria");
    pantalla.innerHTML = `🎉 ¡GANASTE! La palabra era: <strong>${estado.palabraSecreta.toUpperCase()}</strong>`;
}

// Mostrar pantalla de derrota
export function mostrarDerrota(estado) {
    const pantalla = document.getElementById("pantalla-resultado");
    pantalla.classList.remove("oculto");
    pantalla.classList.remove("victoria");
    pantalla.classList.add("derrota");
    pantalla.innerHTML = `💀 PERDISTE. La palabra era: <strong>${estado.palabraSecreta.toUpperCase()}</strong>`;
}

// Ocultar pantalla de resultado
export function ocultarPantallaResultado() {
    const pantalla = document.getElementById("pantalla-resultado");
    pantalla.classList.add("oculto");
    pantalla.classList.remove("victoria", "derrota");
}