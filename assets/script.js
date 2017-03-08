//A javascript implementation of Mine Sweeper
//By Amir Afshar

var totalRows = 9;
var rowsArray = [];
var tilesPerRow = 9;
var remainingTiles = totalRows * tilesPerRow;
var totalMines = 10;

var flag = document.createElement('img');
flag.src = 'assets/flag.png';
flag.alt = 'flag';
flag.className = 'flag';
// Determines which tiles to click on next when the player clicks on an empty tile
var EmptyTileChain = []

document.addEventListener("DOMContentLoaded", startGame);





// Restarts the gameboard and sets up all tilesPerRow
function startGame() {
    var board = document.getElementById("board");
    for (var i = 0; i < totalRows; i++)
        new Row();

    console.log(rowsArray);
    addMines();
}

// Creates the Row object
function Row() {
    this.element = document.createElement('tr');
    board.appendChild(this.element);
    this.tilesArray = [];
    rowsArray.push(this);

    for(var i = 0; i < tilesPerRow; i++) {
        new Tile(this);
    }
    this.index = rowsArray.length - 1;
}

// Creates the Tile object
function Tile(row) {

    var tile = this;
    this.element = document.createElement('td');
    row.element.appendChild(this.element);
    // the number of mines adjacent to this tile
    this.adjacentMines = 0;
    this.mine = false;
    this.clicked = false;
    //Add the tile to an array of that row
    row.tilesArray.push(this);
    this.row = row
    this.index = row.tilesArray.length - 1;
    this.rowIndex = rowsArray.length -1;


    this.flag = function (event) {
        event.preventDefault();
        if (!this.firstChild) {
            var duplicate = flag.cloneNode();
            this.appendChild(duplicate);
            this.removeEventListener('click', tile.click);
        } else {
            this.removeChild(this.firstChild);
            this.addEventListener('click', tile.click, false);
        }
    }


    this.click = function (event) {
        // Clicked tiles will not listen for flag or click events
        tile.element.removeEventListener('contextmenu', tile.flag);
        tile.element.removeEventListener('click', tile.click);
        tile.clicked = true;

        if (tile.mine) {
            alert("boom");
        } else if (tile.adjacentMines == 0) {
            tile.element.textContent = tile.adjacentMines.toString();
            clickAdjacentTiles(tile);
        } else {
            tile.element.textContent = tile.adjacentMines.toString();
        }
    }

    // The event listeners for the tile
    this.element.addEventListener('contextmenu', tile.flag, false);
    this.element.addEventListener('click', tile.click, false);
}

function clickAdjacentTiles(tile) {

    for (var rowOffset = -1; rowOffset < 2; rowOffset++) {
        // Checks if the current row index is within bounds before adding the Count
        if (tile.rowIndex+rowOffset >= 0 && tile.rowIndex+rowOffset < totalRows) {
            var row = rowsArray[tile.rowIndex + rowOffset];
            for (var tileOffset = -1; tileOffset < 2; tileOffset++) {
                // Checks if the tile is within bounds
                if (tile.index+tileOffset >= 0 && tile.index+tileOffset < tilesPerRow &&
                    row.tilesArray[tile.index+tileOffset].clicked === false) {

                    row.tilesArray[tile.index+tileOffset].click();
                }
            }
        }
    }
}

// Checks for neighbouring tiles of a mine and increments their mine count
Tile.prototype.proximityCount = function() {

    for (var rowOffset = -1; rowOffset < 2; rowOffset++) {
        // Checks if the current row index is within bounds before adding the Count
        if (this.rowIndex+rowOffset >= 0 && this.rowIndex+rowOffset < totalRows) {
            var row = rowsArray[this.rowIndex + rowOffset];

            for (var tileOffset = -1; tileOffset < 2; tileOffset++) {
                // Checks if the tile is within bounds
                if (this.index+tileOffset >= 0 && this.index+tileOffset < tilesPerRow) {
                    row.tilesArray[this.index+tileOffset].adjacentMines++;
                }
            }
        }
    }
}


// Adds mines randomly to the board
function addMines() {
    var minesLeft = totalMines;
    var tile;

    while(minesLeft != 0) {
        //testing
        console.log(tile);

        //Randomly places mines in tiles that do not already have a mine
        tile = rowsArray[Math.floor(Math.random() * totalRows)].tilesArray[Math.floor(Math.random() * tilesPerRow)];
        if(!tile.mine) {
            tile.mine = true;
            minesLeft--;
            tile.proximityCount();
            //testing purposes
            //tile.element.className = "mine";
        }
    }
}
