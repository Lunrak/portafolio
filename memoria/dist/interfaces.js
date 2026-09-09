"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DificultadMemoria = exports.EstadoCarta = void 0;
exports.obtenerCartasPorEstado = obtenerCartasPorEstado;
exports.calcularPuntuacion = calcularPuntuacion;
var EstadoCarta;
(function (EstadoCarta) {
    EstadoCarta["Oculta"] = "OCULTA";
    EstadoCarta["Revelada"] = "REVELADA";
    EstadoCarta["Emparejada"] = "EMPAREJADA";
})(EstadoCarta || (exports.EstadoCarta = EstadoCarta = {}));
var DificultadMemoria;
(function (DificultadMemoria) {
    DificultadMemoria["Facil"] = "FACIL";
    // 4x4 = 16 cartas
    DificultadMemoria["Normal"] = "NORMAL";
    DificultadMemoria["Dificil"] = "DIFICIL";
})(DificultadMemoria || (exports.DificultadMemoria = DificultadMemoria = {}));
//funcion para obtener cartas por estado
function obtenerCartasPorEstado(tablero) {
    const resultado = {
        [EstadoCarta.Oculta]: [],
        [EstadoCarta.Revelada]: [],
        [EstadoCarta.Emparejada]: [],
    };
    tablero.cartas.forEach((carta) => {
        resultado[carta.estado].push(carta);
    });
    return resultado;
}
function calcularPuntuacion(intentos, tiempoSegundos, dificultad) {
    //base por dificultad
    const basePorDificultad = {
        [DificultadMemoria.Facil]: 100,
        [DificultadMemoria.Normal]: 250,
        [DificultadMemoria.Dificil]: 500,
    };
    //bono por pocos intentos
    const bonificacionIntentos = Math.max(0, 100 - intentos * 5);
    //bonificacion por tiempo
    const bonificacionTiempo = tiempoSegundos < 60 ? 50 : 0;
    const puntajeFinal = basePorDificultad[dificultad] + bonificacionIntentos + bonificacionTiempo;
    return {
        intentos,
        tiempoSegundos,
        dificultad,
        puntajeFinal,
    };
}
