export interface Juego {
	id: number;
	titulo: string;
	descripcion: string;
	tecnologias: string[];
	estado: 'completado' | 'en-progreso' | 'pendiente';
	enlace?: string;
}
