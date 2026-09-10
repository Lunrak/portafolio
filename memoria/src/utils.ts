export function barajarArray<T>(array: T[]): T[] {
	const copia = [...array];
	for (let i = copia.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copia[i], copia[j]] = [copia[j]!, copia[i]!];
	}
	return copia;
}

export function obtenerAleatorio<T>(array: readonly T[]): T {
	const indice = Math.floor(Math.random() * array.length);
	return array[indice]!;
}

export function agruparPor<T, K extends keyof T>(
	array: T[],
	clave: K,
): Record<string, T[]> {
	return array.reduce(
		(grupos, elemento) => {
			const valorClave = String(elemento[clave]);
			if (!grupos[valorClave]) {
				grupos[valorClave] = [];
			}
			grupos[valorClave]!.push(elemento);
			return grupos;
		},
		{} as Record<string, T[]>,
	);
}

export function eliminarDuplicados<T>(array: T[]): T[] {
	return [...new Set(array)];
}

export function obtenerUltimo<T>(array: T[]): T | undefined {
	return array[array.length - 1];
}