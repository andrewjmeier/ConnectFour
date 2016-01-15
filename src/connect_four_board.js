var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;

function ConnectFourBoard() { 
  TableTop.GridBoard.call(this, 7, 7);
  this.buildTiles();
}

inherits(ConnectFourBoard, TableTop.GridBoard);

/*
  What tiles does your game board have? What colors are they?
*/
ConnectFourBoard.prototype.buildTiles = function() {
  var tileColor = 0xAAAAAA;
  var tile;
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      tile = new TableTop.Tile({color: tileColor});
      this.spaces[x][y] = tile;
    }
  } 
};

module.exports = ConnectFourBoard;