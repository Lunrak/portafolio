"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barajarArray = barajarArray;
exports.obtenerAleatorio = obtenerAleatorio;
exports.agruparPor = agruparPor;
exports.eliminarDuplicados = eliminarDuplicados;
exports.obtenerUltimo = obtenerUltimo;
// ===== UTILIDADES GENÉRICAS =====
// Barajar array genérico
function barajarArray(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}
// Obtener elemento aleatorio genérico
function obtenerAleatorio(array) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
}
// Agrupar elementos por clave genérica
function agruparPor(array, clave) {
    return array.reduce((grupos, elemento) => {
        const valorClave = String(elemento[clave]);
        if (!grupos[valorClave]) {
            grupos[valorClave] = [];
        }
        grupos[valorClave].push(elemento);
        return grupos;
    }, {});
}
// Eliminar duplicados genéricos
function eliminarDuplicados(array) {
    return [...new Set(array)];
}
// Obtener el último elemento genérico
function obtenerUltimo(array) {
    return array[array.length - 1];
}
