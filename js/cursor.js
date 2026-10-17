document.addEventListener('DOMContentLoaded', () => {
	[...document.querySelectorAll('.cursor, .terminal__cursor')].forEach((el) => {
		el.classList.add('animate-blink');
	});
});
