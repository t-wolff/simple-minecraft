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
			const currentTool = this.player.currentTool;
			const tileType = event.target.dataset.type;
			if (!event.target.classList.contains('game-board')) {
				const condition =
					this.gameStage === 1
						? currentTool === tileType && event.target.classList.contains('fade-tile')
						: currentTool === tileType;
				console.log(currentTool);
					if (condition) {
						this.world.removeTile(event.target);
						this.player.addItem(tileType);
						this.ui.updateScore(this.player.getScore());
						this.ui.updateInventory(this.player.inventory, this.player.typeChosen);
					
				}
			}
		});

		// const resetBtn = document.querySelector('.reset-btn');
		// resetBtn.addEventListener('click', () => this.resetGame());
	}

	startLevel2() {
		this.player.showScore();
		this.ui.buildInventoryBtn(this.world.gameBoard);
        this.world.buildInventoryTiles(this.player);
	}

	async updateLevel1() {
		while (this.gameStage === 1) {
			const fadedTile = this.world.fadeTile();
			if (!fadedTile) {
				this.gameStage = 2;
			} else {
				await new Promise((resolve) => {
					setTimeout(() => {
						this.world.removeTile(fadedTile);
						resolve();
					}, 2000);
				});
			}
		}
	}

	updateLevel2() {
        this.world.gameBoard.addEventListener('click', (event) => {
			if (
				!event.target.classList.contains('game-board') &&
				event.target.classList.contains('empty-space')
			) {
				this.world.gameBoard.classList.remove(`cursor-${this.player.typeChosen}`);
				if (
					this.player.inventory[this.player.typeChosen] > 0 &&
					this.player.currentTool !== event.target.dataset.type
				) {
					this.player.removeItem(this.player.typeChosen);
					this.ui.updateInventory(this.player.inventory, this.player.typeChosen);
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

	clearBoard() {
		const tiles = Array.from(this.world.gameBoard.children)
		tiles.forEach(tile => {
			this.world.removeTile(tile);
		})
	}

	// resetGame() {
	// 	 const tiles = this.world.gameBoard.querySelectorAll('.tile');
	// 	tiles.forEach(tile => this.world.gameBoard.remove(tile));
	// 	for (const key in this.player.inventory) {
	// 	        this.player.inventory[key] = 0;
	// 	}
	// 	const game = new Game();
	// 	game.startGame();
	// 	game.updateLevel1();
	// }
}
