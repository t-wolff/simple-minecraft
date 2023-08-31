import { Game } from "./modules/game.js";

const startBtn = document.querySelector('.start-game-btn');
const overlay = document.querySelectorAll('.overlay');


startBtn.addEventListener("click", () => {overlay.forEach((item, i) => {
    setTimeout(() => {
        item.classList.add('hidden')
      }, i * 1000);
})});


const game = new Game();
game.startGame();
