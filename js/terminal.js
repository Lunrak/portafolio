document.addEventListener('DOMContentLoaded', () => {
	const terminalBody = document.getElementById('terminal-body');
	if (!terminalBody) return;

	const originalHTML = terminalBody.innerHTML;
	let hasTyped = terminalBody.dataset.typed === 'true';

	function runTypingAnimation() {
		if (hasTyped) return;
		hasTyped = true;
		terminalBody.dataset.typed = 'true';

		terminalBody.innerHTML = '';

		const temp = document.createElement('div');
		temp.innerHTML = originalHTML;
		const paragraphs = Array.from(temp.querySelectorAll('p'));

		let delay = 0;
		const lineDelay = 350;
		const charDelay = 16;

		paragraphs.forEach((p, index) => {
			const line = document.createElement('p');
			terminalBody.appendChild(line);

			const fullHTML = p.innerHTML;
			const textOnly = p.textContent || '';
			const isPromptLine = p.querySelector('.terminal__prompt') !== null;
			const isLast = index === paragraphs.length - 1;

			setTimeout(() => {
				if (isPromptLine && !isLast) {
					let i = 0;
					const interval = setInterval(() => {
						line.textContent = textOnly.slice(0, i);
						i++;
						if (i > textOnly.length) {
							clearInterval(interval);
							line.innerHTML = fullHTML;
						}
					}, charDelay);
				} else if (isLast) {
					line.innerHTML = fullHTML;
				} else {
					line.innerHTML = fullHTML;
				}
			}, delay);

			delay +=
				isPromptLine && !isLast
					? textOnly.length * charDelay + lineDelay
					: lineDelay;
		});
	}

	window.addEventListener('sectionchange', (e) => {
		if (e.detail && e.detail.section === 'about') {
			runTypingAnimation();
		}
	});

	if (document.getElementById('about')?.classList.contains('active')) {
		runTypingAnimation();
	}
});
