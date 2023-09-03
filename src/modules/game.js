import { World } from "./world.js";
import { Player } from "./player.js";

let gameOver = false;

export class Game {
    constructor () {
        this.world = new World();
        this.player = new Player();
        this.tools = Array.from(document.querySelectorAll('.tool'));
        this.gameStage = 1;
    }
    
    startGame() {
        this.world.generateWorld();

        this.tools.forEach(item => {
            item.addEventListener("click", (event) => {
                this.player.selectTool(event.target.dataset.type)
            })
        })

        // this.world.gameBoard.addEventListener("click", (event) => {
        //     const condition = this.gameStage === 1 ? 
        //     this.player.currentTool === event.target.dataset.type && event.target.classList.contains("fade-tile") :
        //     this.player.currentTool === event.target.dataset.type
        //     console.log(event.target.classlist.contains("fade-tile"));
        //     if (condition) {
        //         this.world.removeTile(event.target);
        //         this.player.addItem(event.target.dataset.type);
        //     }
        // });

        this.world.gameBoard.addEventListener("click", (event) => {
            if (event.target) {
                const condition = this.gameStage === 1 ?
                    this.player.currentTool === event.target.dataset.type && event.target.classList.contains("fade-tile") :
                    this.player.currentTool === event.target.dataset.type;
        
                if (condition) {
                    this.world.removeTile(event.target);
                    this.player.addItem(event.target.dataset.type);
                }
            }
        });
        

        const reset = document.querySelector('.reset-btn');
        reset.addEventListener("click", () => this.resetGame());

    }

    updateGame() {
        if (this.gameStage === 1) {
            const fadedTile = this.world.fadeTile();
            setTimeout(() => this.world.removeFadedTile(fadedTile), 2000)
            if (!fadedTile) {this.gameStage = 2}
        
            setTimeout(() => {
                this.updateGame();
            }, 2000);
        }
    }

    resetGame() {
        //  const tiles = this.world.gameBoard.querySelectorAll('.tile');
        // tiles.forEach(tile => this.world.gameBoard.remove(tile));

        for (const key in this.player.inventory) {
                this.player.inventory[key] = 0;
        }
        const game = new Game();
        game.startGame();
        game.updateGame();
          
   }

}
