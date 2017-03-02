var rows = 10;
var rowsArray = [];
var tiles = 10;
var remainingTiles = rows * tiles;
var totalMines = 10;

document.addEventListener("DOMContentLoaded", startGame);





// Restarts the gameboard and sets up all tiles
function startGame() {
    var board = document.getElementById("board");
    for (var i = 0; i < rows; i++)
        new Row();

    console.log(rowsArray);
    addMines();
}

// Creates the Row object
function Row() {
    this.element = document.createElement('tr');
    board.appendChild(this.element);
    this.tilesArray = [];
    for(var i = 0; i < tiles; i++) {
        new Tile(this);
    }
    rowsArray.push(this);
}

// Creates the Tile object
function Tile(row) {
    this.element = document.createElement('td');
    row.element.appendChild(this.element);
    this.mine = false;

    //Add the tile to an array of that row
    row.tilesArray.push(this);

    //Checks for a click on a tile
    //This is assigned to tile so its flag function can be called in the event handler
    var tile = this;
    this.element.addEventListener('contextmenu', tile.flag, false);
}

// Sets the mine flags
Tile.prototype.flag = function (event) {
    event.preventDefault();
    if (this.textContent == '')
        this.textContent = "F";
    else
        this.textContent = '';
}

function addMines() {
    var minesLeft = totalMines;
    var tile;

    while(minesLeft != 0) {
        console.log(tile);
        tile = rowsArray[Math.floor(Math.random() * rows)].tilesArray[Math.floor(Math.random() * tiles)];
        if(!tile.mine) {
            tile.mine = true;
            minesLeft--;
            //testing purposes
            tile.element.className = "mine";
        }
    }
}
