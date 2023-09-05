import { World } from './world.js';
import { Player } from './player.js';
import { pastelColors } from '../models/constants.js';
import { getRandomNum } from '../utils/utils.js';

export class Game {
	constructor() {
		this.world = new World();
		this.player = new Player();
		this.tools = Array.from(document.querySelectorAll('.tool'));
		this.gameStage = 1;
	}

	startLevel1() {
		if (this.gameStage === 1) {
			this.world.generateWorld();
		}

		this.tools.forEach((item) => {
			item.addEventListener('click', (event) => {
				this.tools.forEach((button) => {
					button.setAttribute('id', '');
				});
				event.target.setAttribute('id', 'navbar-btn-chosen');
				this.player.selectTool(event.target.dataset.type);
			});
		});

		this.world.gameBoard.addEventListener('click', (event) => {
			if (event.target) {
				const condition =
					this.gameStage === 1
						? this.player.currentTool === event.target.dataset.type &&
						  event.target.classList.contains('fade-tile')
						: this.player.currentTool === event.target.dataset.type;

				if (condition) {
					this.world.removeTile(event.target);
					this.player.addItem(event.target.dataset.type);
					document.querySelector(
						'.inventory-btn span'
					).textContent = `SCORE ${this.player.getScore()}`;
				}
			}
		});

		const reset = document.querySelector('.reset-btn');
		reset.addEventListener('click', () => this.resetGame());
	}

	startLevel2() {
		this.player.showScore();
		this.player.buildInventory(this.world.gameBoard);

		
	}

	async updateGame() {
		while (this.gameStage === 1) {
			const fadedTile = this.world.fadeTile();
			if (!fadedTile) {
				this.gameStage = 2;
			} else {
				await new Promise((resolve) => {
					setTimeout(() => {
						this.world.removeFadedTile(fadedTile);
						resolve();
					}, 1);
				});
			}
		}
	}

	updateGame2() {
		const inventoryContainer = document.querySelector('.inventory');
        
		for (const property in this.player.inventory) {
			if (this.player.inventory[property] > 0) {
				const inventoryCount = document.createElement('div');
                inventoryCount.classList.add(`inventory-count-${property}`);
				inventoryCount.textContent = `Blocks Remaining : ${this.player.inventory[property]}`;

				const block = document.createElement('div');
				block.classList.add('inventory-tile');
				block.setAttribute('data-type', property);
				block.style.backgroundColor = pastelColors[getRandomNum(pastelColors.length) - 1];

				inventoryContainer.appendChild(block);
				inventoryContainer.appendChild(inventoryCount);

				block.addEventListener('click', () => {
					if (this.player.inventory[property] > 0) {
						this.world.gameBoard.classList.remove(`cursor-${this.player.typeChosen}`);
						this.world.gameBoard.classList.add(`cursor-${property}`);
						this.player.typeChosen = property;
						console.log(this.player.inventory);
					}
				});
			}
		}
       
        this.world.gameBoard.addEventListener('click', (event) => {
			if (event.target && event.target.dataset.type) {
				if (this.player.currentTool === event.target.dataset.type) {
					this.world.removeTile(event.target);
					this.player.addItem(event.target.dataset.type);
				}
			} else if (event.target) {
                const inventoryCount = document.querySelector(`.inventory-count-${this.player.typeChosen}`);

				this.world.gameBoard.classList.remove(`cursor-${this.player.typeChosen}`);
				if (this.player.inventory[this.player.typeChosen] > 0) {
                    this.player.inventory[this.player.typeChosen]--;
                    console.log(this.player.inventory);
                    inventoryCount.textContent = `Blocks Remaining : ${this.player.inventory[this.player.typeChosen]}`;
					this.world.addTile(
                        this.player.typeChosen,
						event.target.style.gridColumnStart,
						event.target.style.gridRowStart,
						event.target
                        );
                    }
			}
		});

	}

	resetGame() {
		//  const tiles = this.world.gameBoard.querySelectorAll('.tile');
		// tiles.forEach(tile => this.world.gameBoard.remove(tile));
		// for (const key in this.player.inventory) {
		//         this.player.inventory[key] = 0;
		// }
		// const game = new Game();
		// game.startGame();
		// game.updateGame();
	}
}
