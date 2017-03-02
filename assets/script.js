var rows = 10;
var rowsArray = [];
var tiles = 10;
var remainingTiles = rows * tiles;

document.addEventListener("DOMContentLoaded", startGame);





// Restarts the gameboard and sets up all tiles
function startGame() {
    var board = document.getElementById("board");
    for (var i = 0; i < rows; i++)
        new Row();

    console.log(rowsArray);
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
