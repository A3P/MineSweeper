//A javascript implementation of Mine Sweeper
//By Amir Afshar

var rows = 10;
var rowsArray = [];
var tiles = 10;
var remainingTiles = rows * tiles;
var totalMines = 10;
//Determines which tiles
var EmptyTileChain = []

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
    this.index = rowsArray.length - 1;
}

// Creates the Tile object
function Tile(row) {
    this.element = document.createElement('td');
    row.element.appendChild(this.element);
    this.mine = false;
    this.clicked = false;

    //Add the tile to an array of that row
    row.tilesArray.push(this);
    this.index = row.tilesArray.length - 1;

    //Checks for a click on a tile
    //This is assigned to tile so its flag function can be called in the event handler
    var tile = this;
    this.element.addEventListener('contextmenu', tile.flag, false);
    //Event Listener passes on the object if the click method is called through a function
    this.callClick = function (){tile.click(event)}
    this.element.addEventListener('click', tile.callClick, false);
}

// Sets the mine flags
Tile.prototype.flag = function (event) {
    event.preventDefault();
    if (this.textContent == '')
        this.textContent = "F";
    else
        this.textContent = '';
}

Tile.prototype.click = function (event) {
    var tile = this;
    this.element.removeEventListener('click', tile.callClick, false);
    this.clicked = true;
    console.log(this)

    if (this.mine)
        alert("boom");
}

function addMines() {
    var minesLeft = totalMines;
    var tile;

    while(minesLeft != 0) {
        //testing
        console.log(tile);

        //Randomly places mines in tiles that do not already have one
        tile = rowsArray[Math.floor(Math.random() * rows)].tilesArray[Math.floor(Math.random() * tiles)];
        if(!tile.mine) {
            tile.mine = true;
            minesLeft--;
            //testing purposes
            tile.element.className = "mine";
        }
    }
}
