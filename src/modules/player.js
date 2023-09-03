export class Player {
    constructor() {
        this.currentTool = null;
        this.inventory =  {circle : 0,
                        square : 0,
                        triangle : 0,}
    }

    addItem(item) {
        this.inventory[item]++
        console.log(this.inventory);
    }

    removeItem(item) {
        this.inventory[item]--
    }

    selectTool(tool) {
        this.currentTool = tool;
    }
}
