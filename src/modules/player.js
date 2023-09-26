export class Player {
	constructor() {
		this.currentTool = null;
		this.inventory = { circle: 0, square: 0, star: 0 };
		this.score = 0;
		this.currentAddTool = null;
	}

	addItem(item) {
		this.inventory[item]++;
	}

	removeItem(item) {
		this.inventory[item]--;
	}

	selectTool(tool) {
		this.currentTool = tool;
		this.currentAddTool = null;
	}

	selectAddTool(tool) {
		this.currentAddTool = tool;
		this.currentTool = null;
	}

	getScore() {
		this.score = Object.values(this.inventory).reduce((total, curr) => total + curr, 0) || 0;
		return this.score;
	}

	showScore() {
		const overlay = document.createElement('div');
		const title = document.createElement('h1');
		const smallText = document.createElement('h4');
		const message = this.score < 30 ? `GET SOME PRACTICE.` : `WOW! GREAT JOB!`;

		overlay.className = `overlay overlay-main`;
		title.textContent = `${message} 
                            YOUR SCORE IS : ${this.score}`;
		smallText.textContent = `Click me. In the next page click on Inventory Button.`;

		document.body.appendChild(overlay);
		overlay.appendChild(title);
		overlay.appendChild(smallText);
		overlay.addEventListener('click', () => {
			if (this.score !== 0) {
				overlay.classList.add('hidden');
			} else {
				if (confirm(`NO SECOND ROUND FOR YOU - TRY AGAIN`)) {
					window.location.reload();
				}
			}
		});
	}
}
