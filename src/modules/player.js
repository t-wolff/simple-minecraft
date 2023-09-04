import { pastelColors } from "../models/constants.js";
import { getRandomNum } from "../utils/utils.js";

export class Player {
    constructor() {
        this.currentTool = null;
        this.inventory =  {circle : 2,
                        square : 2,
                        star : 2,}
        this.score = 0;
        this.typeChosen = '';
    }

    addItem(item) {
        this.inventory[item]++
    }

    removeItem(item) {
        this.inventory[item]--
    }

    selectTool(tool) {
        this.currentTool = tool;
    }

    getScore() {
        this.score = Object.values(this.inventory).reduce((total, curr) => total + curr, 0) || 0 ;
        console.log(this.score);
        return this.score
    }

    showScore() {
        const overlay = document.createElement('div');
        const title = document.createElement('h1');
        overlay.className = `overlay overlay-main`;
        const message = this.score < 30 ? `GET SOME PRACTICE.` : `WOW! GREAT JOB!`
        title.textContent = `${message} 
                            YOUR SCORE IS : ${this.score}`
        document.body.appendChild(overlay);
        overlay.appendChild(title); 
        overlay.addEventListener("click", () => {overlay.classList.add('hidden')})
    }

    buildInventory(gameBoard) {
        const inventoryBtn = document.querySelector('.inventory-btn');
        const inventoryContainer = document.querySelector('.inventory');

        inventoryContainer.style.display = 'inline';
        inventoryBtn.textContent = `INVENTORY`;
        inventoryBtn.addEventListener("mouseOver", () => {inventoryContainer.classList.remove("hidden")})
        inventoryBtn.addEventListener("mouseOut", () => {inventoryContainer.classList.add("hidden")})
        
        for (const property in this.inventory) {
            const count = document.createElement('div');
            const block = document.createElement('div');

            block.classList.add("inventory-tile");
            block.setAttribute('data-type', property);
            block.setAttribute('draggable', 'true');
         

            block.style.backgroundColor = pastelColors[getRandomNum(pastelColors.length)-1]

            count.textContent = this.inventory[property]
            inventoryContainer.appendChild(block)
            inventoryContainer.appendChild(count)

            block.addEventListener("click", () => {if (this.inventory[property] > 0) {gameBoard.classList.add(`cursor-${property}`)}})
        }
        
    }
}
