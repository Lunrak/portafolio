document.addEventListener('DOMContentLoaded', () => {
	const cursors = document.querySelectorAll('.cursor, .terminal__cursor');

	cursors.forEach((el) => {
		// Por si algún navegador no aplica bien la clase de animación
		if (!el.style.animation) {
			el.style.animation = 'blink 1s steps(2) infinite';
		}
	});
});
