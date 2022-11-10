class Cell {
    constructor(x, y, w, h, possibilities) {
        this.possibilities = possibilities;
        this.collapsed = false;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}