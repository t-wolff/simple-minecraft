export class Ui {
    constructor () {

    }

    buildInventory(gameBoard) {
        const navbar = document.querySelector('.navbar')
		const inventoryBtn = document.querySelector('.inventory-btn');
		const inventoryContainer = document.querySelector('.inventory');
        
        gameBoard.classList.add('gameboard-adjust');
        navbar.classList.add('navbar-adjust')

		inventoryContainer.classList.add('hidden');
		inventoryBtn.textContent = `INVENTORY`;

		inventoryBtn.addEventListener('mouseover', () => {
            if (!inventoryContainer.classList.contains('clicked')) {
                inventoryContainer.classList.remove('hidden');
            }
		});
		inventoryBtn.addEventListener('mouseout', () => {
            if (!inventoryContainer.classList.contains('clicked')) {
                inventoryContainer.classList.add('hidden');
            }
		});
        inventoryBtn.addEventListener('click', () => {
			inventoryContainer.classList.remove('hidden');
            inventoryContainer.classList.toggle('clicked')
		});
	}

    updateInventory(inventory, type) {
        const inventoryCount = document.querySelector(`.inventory-count-${type}`);
        if( inventory && type && inventoryCount) {
            inventoryCount.textContent = `Blocks Remaining : ${inventory[type]}`
            console.log( `inventory ${JSON.stringify(inventory)} ; type ${type} ; inventory[type] = ${inventory[type]}`);
        }
    }

    updateScore(score) {
        const scoreContainer = document.querySelector('.inventory-btn span')
        if (score && scoreContainer) {
            scoreContainer.textContent = `SCORE ${score}`
        }
    }
}