export class Ui {
    constructor () {

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

    updateInventory(inventory, type) {
        const inventoryCount = document.querySelector(`.inventory-count-${type}`);
        if( inventory && type && inventoryCount) {
            inventoryCount.textContent = `Blocks Remaining : ${inventory[type]}`
        }
    }

    updateScore(score) {
        const scoreContainer = document.querySelector('.inventory-btn span')
        if (score && scoreContainer) {
            scoreContainer.textContent = `SCORE ${score}`
        }
    }
}