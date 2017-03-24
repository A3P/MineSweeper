//A javascript implementation of Mine Sweeper

document.addEventListener("DOMContentLoaded", function() {
    board = document.getElementById("board");
    clickedClass = 'clicked';
    countClass = 'count';

    flag = document.createElement('img');
    flag.src = 'assets/flag.png';
    flag.alt = 'flag';
    flag.className = 'flag';

    mine = document.createElement('img');
    mine.src = 'assets/mine.png';
    mine.alt = 'mine';

    button = document.querySelector('button');
    button.addEventListener("click", startGame);
});






// Restarts the gameboard and sets up all tilesPerRow
function startGame() {

    //Array content is reset at the start of every game
    button.textContent = "Start New Game";
    gameOver = false;
    rowsArray = [];
    board.innerHTML = '';

    //Checks to see if all the board parameters are within bounds
    //If not a number or out of bounds a default value will be provided
    totalRows = parseInt(document.getElementById('height').value);
    if (isNaN(totalRows) ||totalRows < 1 || totalRows > 99)
        totalRows = 9;

    tilesPerRow = parseInt(document.getElementById('width').value);
    if (isNaN(tilesPerRow) || tilesPerRow < 1 || tilesPerRow > 99)
        tilesPerRow = 9;

    totalMines = parseInt(document.getElementById('mines').value);
    if (isNaN(totalMines) || totalMines < 1 || totalMines >= tilesPerRow*totalRows) {
        totalMines = Math.floor(tilesPerRow * totalRows / 10);
    }

    remainingTiles = (tilesPerRow * totalRows) - totalMines;

    for (var i = 0; i < totalRows; i++)
        new Row();

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
    this.element.classList.add("fadeInDown")
    row.element.appendChild(this.element);
    // the number of mines adjacent to this tile
    this.adjacentMines = 0;
    this.mine = false;
    this.clicked = false;
    //Add the tile to an array of that row
    row.tilesArray.push(this);
    this.row = row;
    this.index = row.tilesArray.length - 1;
    this.rowIndex = rowsArray.length -1;


    this.flag = function (event) {
        event.preventDefault();
        if (!this.firstChild) {
            //The flags have to be duplicated for each tile
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
        if (!gameOver) {
            tile.element.removeEventListener('contextmenu', tile.flag);
            tile.element.removeEventListener('click', tile.click);
            tile.clicked = true;

            if (tile.mine) {
                tile.element.className = 'mine'
                tile.element.appendChild(mine.cloneNode());
                gameOver = true;
                button.textContent = "Game Over";
            } else if (tile.adjacentMines == 0) {
                tile.element.className = clickedClass;
                remainingTiles--;
                clickAdjacentTiles(tile);
            } else {
                tile.element.className = clickedClass + ' ' + countClass + tile.adjacentMines.toString();
                tile.element.textContent = tile.adjacentMines.toString();
                remainingTiles--;
            }

            if (remainingTiles === 0) {
                button.textContent = "You Win";
                gameOver = true;
            }
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
                // Checks if the tile is within bounds and is not yet clicked
                if (tile.index+tileOffset >= 0 && tile.index+tileOffset < tilesPerRow &&
                    row.tilesArray[tile.index+tileOffset].clicked === false) {
                    if (tile.element.firstChild)
                        tile.element.removeChild(tile.element.firstChild);

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
        //Randomly places mines in tiles that do not already have a mine
        tile = rowsArray[Math.floor(Math.random() * totalRows)].tilesArray[Math.floor(Math.random() * tilesPerRow)];
        if(!tile.mine) {
            tile.mine = true;
            minesLeft--;
            tile.proximityCount();
        }
    }
}
