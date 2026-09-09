"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_MEMORIA = void 0;
exports.crearTablero = crearTablero;
const interfaces_js_1 = require("./interfaces.js");
const utils_js_1 = require("./utils.js");
const EMOJIS = [
    "🍎",
    "🎮",
    "🚗",
    "🏆",
    "⭐",
    "🎨",
    "🎵",
    "🍕",
    "🌍",
    "🚀",
    "🎯",
    "💎",
    "⚽",
    "🐱",
    "🎲",
    "🐶",
    "📚",
    "🦊",
    "🌈",
    "🐼",
    "🔥",
    "🦁",
    "🌺",
    "🐸",
    "👾",
    "🦄",
    "🤖",
    "🐲",
    "👻",
    "🎃",
    "🎪",
    "🎭",
];
exports.CONFIG_MEMORIA = {
    [interfaces_js_1.DificultadMemoria.Facil]: { columnas: 4, filas: 4 },
    [interfaces_js_1.DificultadMemoria.Normal]: { columnas: 6, filas: 6 },
    [interfaces_js_1.DificultadMemoria.Dificil]: { columnas: 8, filas: 8 }
};
function crearTablero(dificultad = interfaces_js_1.DificultadMemoria.Facil) {
    const { columnas, filas } = exports.CONFIG_MEMORIA[dificultad];
    const totalCartas = columnas * filas;
    const totalParejas = totalCartas / 2;
    // Usar función genérica para barajar
    const emojisBarajados = (0, utils_js_1.barajarArray)([...EMOJIS]);
    const emojisSeleccionados = emojisBarajados.slice(0, totalParejas);
    // Crear cartas
    const cartas = [];
    let id = 0;
    for (let i = 0; i < totalParejas; i++) {
        const parejaId = i;
        for (let j = 0; j < 2; j++) {
            cartas.push({
                id: id++,
                emoji: emojisSeleccionados[i],
                estado: interfaces_js_1.EstadoCarta.Oculta,
                parejaId
            });
        }
    }
    export function seleccionarCarta(tablero, cartaId, cartaSeleccionadaPrevia) {
        const carta = tablero.cartas.find((c) => c.id === cartaId);
        if (!carta) {
            return { tablero, resultado: "carta-ya-revelada", carta: null };
        }
        if (carta.estado === interfaces_js_1.EstadoCarta.Revelada ||
            carta.estado === interfaces_js_1.EstadoCarta.Emparejada) {
            return { tablero, resultado: "carta-ya-revelada", carta: null };
        }
        // Revelar la carta
        const cartasActualizadas = tablero.cartas.map((c) => c.id === cartaId ? { ...c, estado: interfaces_js_1.EstadoCarta.Revelada } : c);
        const tableroActualizado = {
            ...tablero,
            cartas: cartasActualizadas,
            intentos: tablero.intentos + 1,
        };
        // Si no hay carta previa seleccionada
        if (!cartaSeleccionadaPrevia) {
            return {
                tablero: tableroActualizado,
                resultado: "primera-carta-seleccionada",
                carta,
            };
        }
        // Si hay carta previa, comprobar pareja
        if (cartaSeleccionadaPrevia.parejaId === carta.parejaId) {
            // ¡Pareja encontrada!
            const cartasEmparejadas = tableroActualizado.cartas.map((c) => c.id === cartaId || c.id === cartaSeleccionadaPrevia.id
                ? { ...c, estado: interfaces_js_1.EstadoCarta.Emparejada }
                : c);
            const parejasEncontradas = tableroActualizado.parejasEncontradas + 1;
            const completado = parejasEncontradas === tableroActualizado.totalParejas;
            return {
                tablero: {
                    ...tableroActualizado,
                    cartas: cartasEmparejadas,
                    parejasEncontradas,
                    completado,
                },
                resultado: completado ? "tablero-completado" : "pareja-encontrada",
                carta,
            };
        }
        // No son pareja
        return {
            tablero: tableroActualizado,
            resultado: "pareja-fallida",
            carta,
        };
    }
    export function ocultarCartasReveladas(tablero) {
        return {
            ...tablero,
            cartas: tablero.cartas.map((c) => c.estado === interfaces_js_1.EstadoCarta.Revelada
                ? { ...c, estado: interfaces_js_1.EstadoCarta.Oculta }
                : c),
        };
    }
}
