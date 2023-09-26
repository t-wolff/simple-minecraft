import { Game } from "./modules/game.js";
const startBtn = document.querySelector('.start-game-btn');
const overlay = document.querySelectorAll('.overlay');
const nextBtn = document.querySelector('.reset-btn');
let isSkipped = false;

  startBtn.addEventListener("click", () => {
    overlay.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('hidden')
      }, i * 1000);})
      
      setTimeout(newGame, 3000);
  });

  

  async function newGame() {
    const game = new Game();

    nextBtn.addEventListener("click", () => {
      if (!isSkipped) {
        isSkipped = true
        game.clearBoard();
        game.startLevel2();
        game.updateLevel2();
      }
    });

    game.startLevel1();
    await game.updateLevel1();

    if (!isSkipped) {
      game.startLevel2();
      game.updateLevel2();
    }
  }
