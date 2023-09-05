import { getRandomNum } from '../utils/utils.js';
import { pastelColors } from '../models/constants.js';

export class World {
	constructor() {
		this.gameBoard = document.querySelector('.game-board');
	}

	generateWorld() {
		for (let xAxis = 0; xAxis <= 16; xAxis += 1) {
			for (let yAxis = 0; yAxis <= 6; yAxis += 1) {
				const type = generateType(yAxis);
				this.addTile(type, xAxis, yAxis);
			}
		}
	}

	addTile(type, x, y, emptySpace) {
		const tile = document.createElement('div');
		tile.className = `tile`;
		tile.setAttribute('data-type', type);
		tile.style.backgroundColor = pastelColors[getRandomNum(pastelColors.length) - 1];

		if (emptySpace) {
			tile.style.gridRowStart = parseInt(y);
			tile.style.gridColumnStart = parseInt(x);
			this.gameBoard.replaceChild(tile, emptySpace);
		} else {
			tile.style.gridRowStart = parseInt(y) + 1;
			tile.style.gridColumnStart = parseInt(x) + 1;
			this.gameBoard.appendChild(tile);
		}
	}

	removeTile(tile) {
		const emptySpace = document.createElement('div');
		emptySpace.className = 'empty-space';

		if (tile.parentNode === this.gameBoard) {
			const row = parseInt(tile.style.gridRowStart);
			const col = parseInt(tile.style.gridColumnStart);
			emptySpace.style.gridRowStart = row;
			emptySpace.style.gridColumnStart = col;

			this.gameBoard.replaceChild(emptySpace, tile);
		}
	}

	fadeTile() {
		const tilesArr = Array.from(this.gameBoard.querySelectorAll('.tile'));
		if (tilesArr.length > 0) {
			const randomTile = tilesArr[getRandomNum(tilesArr.length) - 1];
			randomTile.classList.add('fade-tile');
			randomTile.style.color = 'grey';
			return randomTile;
		} else {
			return false;
		}
	}

	buildInventoryTiles(player) {
		const inventoryContainer = document.querySelector('.inventory');
		const blocks = [];

		for (const property in player.inventory) {
			if (player.inventory[property] > 0) {
				const inventoryCount = document.createElement('div');
                inventoryCount.classList.add(`inventory-count-${property}`);
				inventoryCount.textContent = `Blocks Remaining : ${player.inventory[property]}`;

				const block = document.createElement('div');
				block.classList.add('inventory-tile');
				block.setAttribute('data-type', property);
				block.style.backgroundColor = pastelColors[getRandomNum(pastelColors.length) - 1];

				inventoryContainer.appendChild(block);
				inventoryContainer.appendChild(inventoryCount);

				block.addEventListener('click', () => {
					if (player.inventory[property] > 0) {
						this.gameBoard.classList.remove(`cursor-${player.typeChosen}`);
						this.gameBoard.classList.add(`cursor-${property}`);
						player.typeChosen = property;
					}
				})
			}
		}

		return blocks;
	}
}

function generateType(y) {
	if (y < 2) {
		return 'square';
	} else if (y < 5) {
		return 'star';
	} else {
		return 'circle';
	}
}
