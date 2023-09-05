export class Player {
	constructor() {
		this.currentTool = null;
		this.inventory = { circle: 0, square: 0, star: 2 };
		this.score = 0;
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
		console.log(this.score);
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
			overlay.classList.add('hidden');
		});
	}

	buildInventory() {
		const inventoryBtn = document.querySelector('.inventory-btn');
		const inventoryContainer = document.querySelector('.inventory');

		inventoryContainer.style.display = 'inline';
		inventoryBtn.textContent = `INVENTORY`;
		inventoryBtn.addEventListener('mouseOver', () => {
			inventoryContainer.classList.remove('hidden');
		});
		inventoryBtn.addEventListener('mouseOut', () => {
			inventoryContainer.classList.add('hidden');
		});
	}
}
