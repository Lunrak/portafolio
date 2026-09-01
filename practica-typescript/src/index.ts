const nombre: string = "[Hansel]";
const edad: number = 31;
const estaAprendiendo: boolean = true;
const tecnologias: string[] = ["HTML", "CSS", "JavaScript", "TypeScript"];

function saludar(nombre: string, edad: number): string {
	return "Hola, soy ${nombre} y tengo ${edad} anos.";
}

function obtenerMensajeAprendizaje(activo: boolean): string {
	if (activo) {
		return "Actualmente estoy aprendiendo TypeScript";
	} else {
		return "Hoy no toca estudiar";
	}
}

console.log(saludar(nombre, edad));
console.log(obtenerMensajeAprendizaje(estaAprendiendo));
console.log("Tecnologias:", tecnologias.join(","));

const proyectos: { nombre: string; estado: string; tecnologias: string[] }[] = [
	{ nombre: "Portafolio", estado: "completado", tecnologias: ["HTML"] },
	{
		nombre: "To-Do App",
		estado: "completado",
		tecnologias: ["HTML", "CSS", "JS"],
	},
	{
		nombre: "Ahorcado",
		estado: "completado",
		tecnologias: ["HTML", "CSS", "JS"],
	},
	{
		nombre: "Juego de Memoria",
		estado: "en progreso",
		tecnologias: ["TypeScript"],
	},
];

proyectos.forEach((proyecto) => {
	console.log("${proyecto.nombre}: ${proyecto.estado}");
});
