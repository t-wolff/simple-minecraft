export class World {
    constructor() {
        this.gameBoard = document.querySelector('.game-board');
    }

    generateWorld() {
        for (let xAxis = 0; xAxis <= 20; xAxis+=1) {
            for (let yAxis = 0; yAxis <= 10; yAxis+=1) {
                const type = generateType(yAxis);
                this.addTile(type, xAxis, yAxis);
            }
        }

       
    }

    
    addTile(type, x, y) {
        const tile = document.createElement('div');
        tile.className = `tile`;
        tile.setAttribute('data-type', type);
        tile.style.gridRowStart = y + 1; 
        tile.style.gridColumnStart = x + 1;
        this.gameBoard.appendChild(tile);
    }

    removeTile(tile) {
        const emptySpace = document.createElement('div');
        emptySpace.className = `empty-space`;

        const row = parseInt(tile.style.gridRowStart);
        const col = parseInt(tile.style.gridColumnStart);
        emptySpace.style.gridRowStart = row;
        emptySpace.style.gridColumnStart = col;

        this.gameBoard.replaceChild(emptySpace, tile);
    }
    
    
}


function generateType(y) {
    if (y < 3) { return 'square'; } 
    else if (y < 5) { return 'circle'; }
    else { return 'triangle'; }
}
