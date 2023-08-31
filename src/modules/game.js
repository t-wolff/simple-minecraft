import { World } from "./world.js";
import { Player } from "./player.js";

let gameOver = false;
export class Game {
    constructor () {
        this.world = new World();
        this.player = new Player();
        this.tools = Array.from(document.querySelectorAll('.tool'));
    }
    
    startGame() {
        this.world.generateWorld();

        this.tools.forEach(item => {
            item.addEventListener("click", (event) => {
                this.player.selectTool(event.target.dataset.type)
            })
        })

        this.world.gameBoard.addEventListener("click", (event) => {
            if (this.player.currentTool === event.target.dataset.type) {
                this.world.removeTile(event.target);
                this.player.addItem(event.target.dataset.type);
            }
        });
    }

    updateWorld() {
        
    }

    resetGame() {
        
        this.world.generateWorld();
    }

}

