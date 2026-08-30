// Lógica pura del juego (sin manipular DOM ni canvas)
import { CONFIG } from "./config.js";

// Crear el estado inicial del juego
export function crearEstadoInicial() {
    const palabraSecreta = CONFIG.palabras[
        Math.floor(Math.random() * CONFIG.palabras.length)
    ];
    
    return {
        palabraSecreta: palabraSecreta,
        letrasAdivinadas: [],
        letrasIncorrectas: [],
        vidasRestantes: CONFIG.maxVidas,
        estado: "jugando" // "jugando", "ganado", "perdido"
    };
}

// Procesar el intento de una letra
export function intentarLetra(estado, letra) {
    // Normalizar la letra (minúscula, sin acentos)
    letra = letra.toLowerCase();
    letra = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Si la letra ya fue intentada, no hacer nada
    if (
        estado.letrasAdivinadas.includes(letra) ||
        estado.letrasIncorrectas.includes(letra)
    ) {
        return { ...estado };
    }

    // Si la letra está en la palabra
    if (estado.palabraSecreta.includes(letra)) {
        const letrasAdivinadas = [...estado.letrasAdivinadas, letra];
        const estadoNuevo = {
            ...estado,
            letrasAdivinadas: letrasAdivinadas
        };

        // Comprobar si ganó
        const palabraCompletada = estado.palabraSecreta
            .split("")
            .every(letraPalabra => letrasAdivinadas.includes(letraPalabra));

        if (palabraCompletada) {
            return { ...estadoNuevo, estado: "ganado" };
        }

        return estadoNuevo;
    }

    // Si la letra NO está en la palabra
    const letrasIncorrectas = [...estado.letrasIncorrectas, letra];
    const vidasRestantes = estado.vidasRestantes - 1;
    const estadoNuevo = {
        ...estado,
        letrasIncorrectas: letrasIncorrectas,
        vidasRestantes: vidasRestantes
    };

    // Comprobar si perdió
    if (vidasRestantes <= 0) {
        return { ...estadoNuevo, estado: "perdido" };
    }

    return estadoNuevo;
}

// Obtener la palabra enmascarada con guiones bajos
export function obtenerPalabraEnmascarada(estado) {
    return estado.palabraSecreta
        .split("")
        .map(letra => estado.letrasAdivinadas.includes(letra) ? letra : "_")
        .join("");
}

// Verificar si la letra es válida (a-z, ñ, sin espacios)
export function esLetraValida(letra) {
    const letraLimpia = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return /^[a-zñ]$/i.test(letraLimpia);
}