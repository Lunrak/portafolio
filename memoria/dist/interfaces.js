export var EstadoCarta;
(function (EstadoCarta) {
    EstadoCarta["Oculta"] = "OCULTA";
    EstadoCarta["Revelada"] = "REVELADA";
    EstadoCarta["Emparejada"] = "EMPAREJADA";
})(EstadoCarta || (EstadoCarta = {}));
export var DificultadMemoria;
(function (DificultadMemoria) {
    DificultadMemoria["Facil"] = "FACIL";
    DificultadMemoria["Normal"] = "NORMAL";
    DificultadMemoria["Dificil"] = "DIFICIL";
})(DificultadMemoria || (DificultadMemoria = {}));
export function obtenerCartasPorEstado(tablero) {
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
export function calcularPuntuacion(intentos, tiempoSegundos, dificultad) {
    const basePorDificultad = {
        [DificultadMemoria.Facil]: 100,
        [DificultadMemoria.Normal]: 250,
        [DificultadMemoria.Dificil]: 500,
    };
    const bonificacionIntentos = Math.max(0, 100 - intentos * 5);
    const bonificacionTiempo = tiempoSegundos < 60 ? 50 : 0;
    const puntajeFinal = basePorDificultad[dificultad] + bonificacionIntentos + bonificacionTiempo;
    return {
        intentos,
        tiempoSegundos,
        dificultad,
        puntajeFinal,
    };
}
