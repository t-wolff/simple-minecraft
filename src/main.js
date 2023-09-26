import { Game } from "./modules/game.js";
const startBtn = document.querySelector('.start-game-btn');
const overlay = document.querySelectorAll('.overlay');
const nextBtn = document.querySelector('.reset-btn');
let level = 1;

  startBtn.addEventListener("click", () => {
    overlay.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('hidden')
      }, i * 1000);})
      
      setTimeout(newGame, 3000);
  });
  
  async function newGame() {
    const game = new Game();

    
    const initNextLevel = () => {
		level = 2;
		game.clearBoard();
		nextBtn.textContent = 'End Game';
		game.startLevel2();
		game.updateLevel2();
    console.log('init next level');
	};

    nextBtn.addEventListener("click", () => {
      if (level === 1) {
       initNextLevel()
      } else if (level === 2) {
        game.endGame();
      }
    });

    game.startLevel1();
    await game.updateLevel1();
    
    if (level === 1) {
      initNextLevel();
    }
  }
