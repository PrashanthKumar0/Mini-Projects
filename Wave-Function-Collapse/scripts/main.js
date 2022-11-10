//--[ GLOBALS ]------------------------------------------------
let ctx;
let wfc;

/********************************
 *    A=deep purple             * 
 *    B=light purple            *
 *    C=violet                  *
 *    D=blue                    *
 ********************************/
const tiles = {
    circuit_coding_train: [
        new Element("../tiles/circuit-coding-train/0.png", ['AAA', 'AAA', 'AAA', 'AAA']),
        new Element("../tiles/circuit-coding-train/1.png", ['BBB', 'BBB', 'BBB', 'BBB']),
        new Element("../tiles/circuit-coding-train/2.png", ['BBB', 'BCB', 'BBB', 'BBB']),
        new Element("../tiles/circuit-coding-train/3.png", ['BBB', 'BDB', 'BBB', 'BDB']),
        new Element("../tiles/circuit-coding-train/4.png", ['ABB', 'BCB', 'BBA', 'AAA']),
        new Element("../tiles/circuit-coding-train/5.png", ['ABB', 'BBB', 'BBB', 'BBA']),
        new Element("../tiles/circuit-coding-train/6.png", ['BBB', 'BCB', 'BBB', 'BCB']),
        new Element("../tiles/circuit-coding-train/7.png", ['BDB', 'BCB', 'BDB', 'BCB']),
        new Element("../tiles/circuit-coding-train/8.png", ['BDB', 'BBB', 'BCB', 'BBB']),
        new Element("../tiles/circuit-coding-train/9.png", ['BCB', 'BCB', 'BBB', 'BCB']),
        new Element("../tiles/circuit-coding-train/10.png", ['BCB', 'BCB', 'BCB', 'BCB']),
        new Element("../tiles/circuit-coding-train/11.png", ['BCB', 'BCB', 'BBB', 'BBB']),
        new Element("../tiles/circuit-coding-train/12.png", ['BBB', 'BCB', 'BBB', 'BCB']),
    ],
    circuit: [
        new Element("../tiles/circuit/0.png", ['AAA', 'AAA', 'AAA', 'AAA']),
        new Element("../tiles/circuit/1.png", ['BBB', 'BBB', 'BBB', 'BBB']),
        new Element("../tiles/circuit/2.png", ['BBB', 'BCB', 'BBB', 'BBB']),
        new Element("../tiles/circuit/3.png", ['BBB', 'BDB', 'BBB', 'BDB']),
        new Element("../tiles/circuit/4.png", ['ABB', 'BCB', 'BBA', 'AAA']),
        new Element("../tiles/circuit/5.png", ['ABB', 'BBB', 'BBB', 'BBA']),
        new Element("../tiles/circuit/6.png", ['BBB', 'BCB', 'BBB', 'BCB']),
        new Element("../tiles/circuit/7.png", ['BDB', 'BCB', 'BDB', 'BCB']),
        new Element("../tiles/circuit/8.png", ['BDB', 'BBB', 'BCB', 'BBB']),
        new Element("../tiles/circuit/9.png", ['BCB', 'BCB', 'BBB', 'BCB']),
        new Element("../tiles/circuit/10.png", ['BCB', 'BCB', 'BCB', 'BCB']),
        new Element("../tiles/circuit/11.png", ['BCB', 'BCB', 'BBB', 'BBB']),
        new Element("../tiles/circuit/12.png", ['BBB', 'BCB', 'BBB', 'BCB']),
    ],
    train_tracks: [
        new Element("../tiles/train-tracks/blank.png", ['A', 'A', 'A', 'A']), //13
        new Element("../tiles/train-tracks/up.png", ['B', 'B', 'A', 'B']),
        new Element("../tiles/train-tracks/right.png", ['B', 'B', 'B', 'A']),
        new Element("../tiles/train-tracks/down.png", ['A', 'B', 'B', 'B']),
        new Element("../tiles/train-tracks/left.png", ['B', 'A', 'B', 'B']), //17
    ],
    pipes: [
        new Element("../tiles/pipes/blank.png", ['A', 'A', 'A', 'A']),
        new Element("../tiles/pipes/up.png", ['B', 'B', 'A', 'B']),
        new Element("../tiles/pipes/right.png", ['B', 'B', 'B', 'A']),
        new Element("../tiles/pipes/down.png", ['A', 'B', 'B', 'B']),
        new Element("../tiles/pipes/left.png", ['B', 'A', 'B', 'B']),
    ],
    mountains: [
        new Element("../tiles/mountains/blank.png", ['A', 'A', 'A', 'A']),
        new Element("../tiles/mountains/up.png", ['B', 'B', 'A', 'B']),
        new Element("../tiles/mountains/right.png", ['B', 'B', 'B', 'A']),
        new Element("../tiles/mountains/down.png", ['A', 'B', 'B', 'B']),
        new Element("../tiles/mountains/left.png", ['B', 'A', 'B', 'B']),
    ],
    polka: [
        new Element("../tiles/polka/blank.png", ['A', 'A', 'A', 'A']),
        new Element("../tiles/polka/up.png", ['B', 'B', 'A', 'B']),
        new Element("../tiles/polka/right.png", ['B', 'B', 'B', 'A']),
        new Element("../tiles/polka/down.png", ['A', 'B', 'B', 'B']),
        new Element("../tiles/polka/left.png", ['B', 'A', 'B', 'B']),
    ],
    roads: [
        new Element("../tiles/roads/blank.png", ['A', 'A', 'A', 'A']),
        new Element("../tiles/roads/up.png", ['B', 'B', 'A', 'B']),
        new Element("../tiles/roads/right.png", ['B', 'B', 'B', 'A']),
        new Element("../tiles/roads/down.png", ['A', 'B', 'B', 'B']),
        new Element("../tiles/roads/left.png", ['B', 'A', 'B', 'B']),
    ],
    rail: [
        new Element("../tiles/rail/tile0.png", ['AAA', 'AAA', 'AAA', 'AAA']), //23
        new Element("../tiles/rail/tile1.png", ['ABA', 'ABA', 'ABA', 'AAA']),
        new Element("../tiles/rail/tile2.png", ['BAA', 'AAB', 'AAA', 'AAA']),
        // new Element("../tiles/rail/tile3.png", ['BAA', 'AAA', 'AAB', 'BBB']),
        new Element("../tiles/rail/tile4.png", ['ABA', 'ABA', 'AAA', 'AAA']),
        new Element("../tiles/rail/tile5.png", ['ABA', 'AAA', 'ABA', 'AAA']),
        new Element("../tiles/rail/tile6.png", ['ABA', 'ABA', 'ABA', 'ABA']), //28
    ],
};

//--[/GLOBALS ]------------------------------------------------

async function main() {
    ctx = $("cnvs").getContext("2d");
    resize();
    $("wrapper").style.display = "none";
    await preload();
    $("wrapper").style.display = "block";
    reset();
    gameLoop();
    // let fps = 10;
    // setInterval(gameLoop, 1000 / fps);
}
onload = main;
onresize = resize;


async function preload() {
    let proms = [];

    for (let key in tiles) {
        let elements = tiles[key];
        elements.forEach((el) => {
            proms.push(el.load());
        });
    }

    await Promise.all(proms)
        .then(() => {
            console.log("loaded all");
        })
        .catch(img_src => {
            console.log(" unable to load : " + img_src);
        });
}

function reset() {
    const NUM_ROWS = 10;
    const NUM_COLS = 10;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    const TILE_SIZE = Math.min(W / NUM_COLS, H / NUM_ROWS);



    let keys = Object.keys(tiles);
    let active_tile = tiles[keys[Math.floor(Math.random() * keys.length)]];

    wfc = new WFC(NUM_ROWS, NUM_COLS, TILE_SIZE, active_tile);
}

//--[ gameLoop() ]------------------------------------------------

function gameLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    wfc.draw_gridlines(ctx);

    wfc.collapse_one();
    wfc.draw(ctx);
    requestAnimationFrame(gameLoop);
}


//--[ / gameLoop() ]------------------------------------------------
