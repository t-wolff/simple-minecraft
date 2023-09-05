export class Player {
	constructor() {
		this.currentTool = null;
		this.inventory = { circle: 2, square: 0, star: 0 };
		this.score = 1;
		this.typeChosen = '';
	}

	addItem(item) {
		this.inventory[item]++;
	}

	removeItem(item) {
		this.inventory[item]--;
	}

	selectTool(tool) {
		this.currentTool = tool;
	}

	getScore() {
		this.score = Object.values(this.inventory).reduce((total, curr) => total + curr, 0) || 0;
		return this.score;
	}

	showScore() {
		const overlay = document.createElement('div');
		const title = document.createElement('h1');
		overlay.className = `overlay overlay-main`;
		const message = this.score < 30 ? `GET SOME PRACTICE.` : `WOW! GREAT JOB!`;
		title.textContent = `${message} 
                            YOUR SCORE IS : ${this.score}`;
		document.body.appendChild(overlay);
		overlay.appendChild(title);
		overlay.addEventListener('click', () => {
            if (this.score !== 0 ) {
                overlay.classList.add('hidden');
            } else {if (confirm(`NO SECOND ROUND FOR YOU - TRY AGAIN`)){
                window.location.reload();}
            }
		});
	}

	
}
