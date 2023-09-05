import { World } from './world.js';
import { Player } from './player.js';
import { Ui } from './ui.js';

export class Game {
	constructor() {
		this.world = new World();
		this.player = new Player();
        this.ui = new Ui();
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
			if (!event.target.classList.contains('game-board')) {
				const condition = this.gameStage === 1 
						? this.player.currentTool === event.target.dataset.type &&
						  event.target.classList.contains('fade-tile')
						: this.player.currentTool === event.target.dataset.type;

				if (condition) {
					this.world.removeTile(event.target);
					this.player.addItem(event.target.dataset.type);
                    this.ui.updateInventory(this.player.inventory, this.player.typeChosen);
                    this.ui.updateScore(this.player.getScore());
					
				}
			}
		});

		const reset = document.querySelector('.reset-btn');
		reset.addEventListener('click', () => this.resetGame());
	}

	startLevel2() {
		this.player.showScore();
		this.ui.buildInventory(this.world.gameBoard);
        this.world.buildInventoryTiles(this.player);
	}

	async updateGame() {
		while (this.gameStage === 1) {
			const fadedTile = this.world.fadeTile();
			if (!fadedTile) {
				this.gameStage = 2;
			} else {
				await new Promise((resolve) => {
					setTimeout(() => {
						this.world.removeTile(fadedTile);
						resolve();
					}, 2);
				});
			}
		}
	}

	updateGame2() {
        this.world.gameBoard.addEventListener('click', (event) => {
			if (!event.target.classList.contains('game-board')) {
				this.world.gameBoard.classList.remove(`cursor-${this.player.typeChosen}`);
				if (this.player.inventory[this.player.typeChosen] > 0 && this.player.currentTool !== event.target.dataset.type) {
                    this.player.removeItem(this.player.typeChosen);
                    this.ui.updateInventory(this.player.inventory, this.player.typeChosen)

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
