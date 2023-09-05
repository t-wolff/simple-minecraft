import { Game } from "./modules/game.js";
const startBtn = document.querySelector('.start-game-btn');
const overlay = document.querySelectorAll('.overlay');
const nextBtn = document.querySelector('.reset-btn');

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
      // game.clearBoard();
			// game.startLevel2();
			// game.updateGame2();
    });

    game.startLevel1();
    await game.updateGame();


    game.startLevel2();
    game.updateGame2();
  }
