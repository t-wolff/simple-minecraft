export class Player {
    constructor() {
        this.currentTool = null;
        this.inventory =  {circle : 0,
                        square : 0,
                        star : 0,}
        this.score = 0;
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
        return Object.values(this.inventory).reduce((total, curr) => total + curr, 0);
    }
}
