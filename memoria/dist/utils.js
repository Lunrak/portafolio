export function barajarArray(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}
export function obtenerAleatorio(array) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
}
export function agruparPor(array, clave) {
    return array.reduce((grupos, elemento) => {
        const valorClave = String(elemento[clave]);
        if (!grupos[valorClave]) {
            grupos[valorClave] = [];
        }
        grupos[valorClave].push(elemento);
        return grupos;
    }, {});
}
export function eliminarDuplicados(array) {
    return [...new Set(array)];
}
export function obtenerUltimo(array) {
    return array[array.length - 1];
}
