// Funciones de dibujo en canvas
import { COLORES } from "./config.js";

// Dibujar la horca completa
export function dibujarHorca(ctx) {
    ctx.strokeStyle = COLORES.horca;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Base horizontal
    ctx.beginPath();
    ctx.moveTo(20, 180);
    ctx.lineTo(180, 180);
    ctx.stroke();

    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(50, 30);
    ctx.stroke();

    // Travesaño horizontal superior
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(130, 30);
    ctx.stroke();

    // Cuerda
    ctx.beginPath();
    ctx.moveTo(130, 30);
    ctx.lineTo(130, 50);
    ctx.stroke();
}

// Dibujar el muñeco según las vidas restantes
export function dibujarMuneco(ctx, vidasRestantes, maxVidas) {
    const partesPerdidas = maxVidas - vidasRestantes;

    ctx.strokeStyle = COLORES.muneco;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (partesPerdidas >= 1) {
        // Cabeza (círculo)
        ctx.beginPath();
        ctx.arc(130, 65, 15, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (partesPerdidas >= 2) {
        // Cuerpo (línea vertical)
        ctx.beginPath();
        ctx.moveTo(130, 80);
        ctx.lineTo(130, 120);
        ctx.stroke();
    }

    if (partesPerdidas >= 3) {
        // Brazo izquierdo
        ctx.beginPath();
        ctx.moveTo(130, 90);
        ctx.lineTo(110, 105);
        ctx.stroke();
    }

    if (partesPerdidas >= 4) {
        // Brazo derecho
        ctx.beginPath();
        ctx.moveTo(130, 90);
        ctx.lineTo(150, 105);
        ctx.stroke();
    }

    if (partesPerdidas >= 5) {
        // Pierna izquierda
        ctx.beginPath();
        ctx.moveTo(130, 120);
        ctx.lineTo(110, 145);
        ctx.stroke();
    }

    if (partesPerdidas >= 6) {
        // Pierna derecha
        ctx.beginPath();
        ctx.moveTo(130, 120);
        ctx.lineTo(150, 145);
        ctx.stroke();
    }
}

// Limpiar el canvas
export function limpiarCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}