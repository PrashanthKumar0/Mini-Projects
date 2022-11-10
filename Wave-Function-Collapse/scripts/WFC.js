class WFC {
    constructor(num_rows, num_cols, tile_size, elements) {
        this.rows = num_rows;
        this.cols = num_cols;
        this.tile_size = tile_size;
        this.elements = elements;
        this.reset();
    }

    reset() {
        this.grid = [];
        for (let y = 0; y < this.rows; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                let _x = x * this.tile_size;
                let _y = y * this.tile_size;
                let _w = this.tile_size;
                let _h = this.tile_size;
                this.grid[y].push(new Cell(_x, _y, _w, _h, this.elements.slice()));
            }
        }
    }
    draw(ctx) {
        this.grid.forEach(row => {
            row.forEach(cell => {
                if (cell.possibilities.length == 1) {
                    // collapsed cell
                    cell.possibilities[0].draw(ctx, cell.x, cell.y, cell.width);
                }
            });
        });
    }
    draw_gridlines(ctx) {
        this.grid.forEach(row => {
            row.forEach(cell => {
                ctx.strokeStyle = "Magenta";
                ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
            });
        })
    }
    collapse_one() {
        // flatten the grid
        let cells = [];
        this.grid.forEach(row => {
            row.forEach(cell => {
                cells.push(cell);
            });
        });
        // get non collapsed cell
        cells = cells.filter(cell => !cell.collapsed);

        // sort the cells according to least entropy
        cells.sort((curr, next) => {
            return curr.possibilities.length - next.possibilities.length;
        });
        if (cells.length == 0) {
            console.log("done :)")
            return;
        }
        let len = cells[0].possibilities.length;
        cells = cells.filter(cell => {
            return (cell.possibilities.length == len);
        });

        // collapse
        let selected_cell = cells[Math.floor(Math.random() * cells.length)];
        let selected_state = selected_cell.possibilities[Math.floor(Math.random() * selected_cell.possibilities.length)];

        // // if (selected_cell.possibilities.length == 1) {
        // //     console.log("done");
        // //     // debugger;
        // //     return;
        // // }

        if (selected_state == undefined) debugger;
        selected_cell.possibilities = [selected_state];
        selected_cell.collapsed = true;
        this.adjust_new_state(selected_cell, selected_state);
    }
    adjust_new_state(selected_cell, selected_state) { // called after collapse
        // let x = 0;
        // let y = 0;
        // for (y = 0; y < this.rows; y++) {
        //     for (x = 0; x < this.cols; x++) {
        //         let cell = this.grid[y][x];
        //         if (cell == selected_cell) {
        //             break;
        //         }
        //     }
        // }
        let x = Math.round(selected_cell.x / this.tile_size);
        let y = Math.round(selected_cell.y / this.tile_size);

        if (y > 0) { // UP
            let curr_pattern = selected_state.edges[0];
            let top_tile = this.grid[y - 1][x];
            if (!top_tile.collapsed) {
                let new_top_tile_possibilities = [];
                top_tile.possibilities.forEach(poss => {
                    let bottom_pattern = poss.edges[2];
                    if (bottom_pattern.split("").reverse().join("") == curr_pattern) {
                        new_top_tile_possibilities.push(poss);
                    }
                });
                if (new_top_tile_possibilities.length > 0) {
                    top_tile.possibilities = new_top_tile_possibilities;
                } else {
                    this.reset();
                    console.log("reset");
                }
            }
        }

        if (x < this.cols - 1) { // RIGHT
            let curr_pattern = selected_state.edges[1];
            let right_tile = this.grid[y][x + 1];
            if (!right_tile.collapsed) {
                let new_right_tile_possibilities = [];
                right_tile.possibilities.forEach(poss => {
                    let left_pattern = poss.edges[3];
                    if (left_pattern.split("").reverse().join("") == curr_pattern) {
                        new_right_tile_possibilities.push(poss);
                    }
                });
                if (new_right_tile_possibilities.length > 0) {
                    right_tile.possibilities = new_right_tile_possibilities;
                } else {
                    this.reset();
                    console.log("reset");
                }
            }
        }

        if (y < this.rows - 1) { // BOTTOM
            let curr_pattern = selected_state.edges[2];
            let bottom_tile = this.grid[y + 1][x];
            if (!bottom_tile.collapsed) {
                let new_bottom_tile_possibilities = [];
                bottom_tile.possibilities.forEach(poss => {
                    let bottom_pattern = poss.edges[0];
                    if (bottom_pattern.split("").reverse().join("") == curr_pattern) {
                        new_bottom_tile_possibilities.push(poss);
                    }
                });
                if (new_bottom_tile_possibilities.length > 0) {
                    bottom_tile.possibilities = new_bottom_tile_possibilities;
                } else {
                    this.reset();
                    console.log("reset");
                }
            }
        }

        if (x > 0) { // LEFT
            let curr_pattern = selected_state.edges[3];
            let left_tile = this.grid[y][x - 1];
            if (!left_tile.collapsed) {
                let new_left_tile_possibilities = [];
                left_tile.possibilities.forEach(poss => {
                    let left_pattern = poss.edges[1];
                    if (left_pattern.split("").reverse().join("") == curr_pattern) {
                        new_left_tile_possibilities.push(poss);
                    }
                });
                if (new_left_tile_possibilities.length > 0) {
                    left_tile.possibilities = new_left_tile_possibilities;
                } else {
                    this.reset();
                    console.log("reset");
                }
            }
        }
    }
}