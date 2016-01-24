var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;


function ConnectFourGame(players, board, turnMap) {
  TableTop.Game.call(this, players, board, turnMap);
  this.currentPlayer = 0;
  this.moveType = TableTop.Constants.moveTypePlaceToken;
  this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
  this.possibleNumPlayers = [2];
  this.showNextPlayerScreen = false;
};

inherits(ConnectFourGame, TableTop.Game);

/*
  Make the move! Move the token from the previous tile to the new tile
*/
ConnectFourGame.prototype.executeMove = function() {  
  var destination = this.proposedMove.destination;
  var newPosition = this.board.getTilePosition(destination);
  
  for (y = 0; y < 7; y++) {
    var tile = this.board.tiles[newPosition.x][y];
    if (!tile.occupier) {
      var token = new TableTop.Token(this.getCurrentPlayer(), tile, this.getCurrentPlayer().color);
      this.board.buildTokenForTile(token, tile);
      this.getCurrentPlayer().tokens.push(tile.occupier);
      return;
    }
  }

  this.proposedMove = {};
};

/*
  Is it legal for the token to move from the old tile to the new tile?
*/
ConnectFourGame.prototype.isValidMove = function(token, oldTile, newTile) { 
  var newPos = this.board.getTilePosition(newTile);

  var topTile = this.board.tiles[newPos.x][6];
  // console.log(!topTile.occupier, topTile, "isValidMove");
  return !topTile.occupier;
};

/*
  Given the current state of the game, did someone win?
*/
ConnectFourGame.prototype.playerDidWin = function(player) {
  for (x = 0; x < 7; x++) {
    for (y = 0; y < 7; y++) {
      var tile = this.board.tiles[x][y];
      if (this.checkSquareForWin(tile)) {
        return true;
      }
    }
  }
  return false;
};

ConnectFourGame.prototype.checkSquareForWin = function(tile) {
  if (tile.occupier != null) {
    console.log(tile.occupier);
    var position = this.board.getTilePosition(tile);
    var color = tile.occupier.color;
    return this.checkRow(color, position) || this.checkColumn(color, position) || this.checkDiagonal(color, position) || this.checkOtherDiagonal(color, position);
  
  } else {
    return false;
  }
};

ConnectFourGame.prototype.checkRow = function(color, position) {
  if (position.x > 3) {
    return false;
  }
  for (i = 1; i < 4; i++) {
    var occupier = this.board.tiles[position.x + i][position.y].occupier;
    if (occupier == null || occupier.color !== color) {
      return false;
    }
  }
  return true;
};

ConnectFourGame.prototype.checkColumn = function(color, position) {
  if (position.y > 3) {
    return false;
  }
  for (i = 1; i < 4; i++) {
    var occupier = this.board.tiles[position.x][position.y + i].occupier;
    if (occupier == null || occupier.color !== color) {
      return false;
    }
  }
  return true;
};

ConnectFourGame.prototype.checkDiagonal = function(color, position) {
  if (position.x > 3 || position.y > 3) {
    return false;
  }
  for (i = 1; i < 4; i++) {
    var occupier = this.board.tiles[position.x + i][position.y + i].occupier;
    if (occupier == null || occupier.color !== color) {
      return false;
    }
  }
  return true;
};

ConnectFourGame.prototype.checkOtherDiagonal = function(color, position) {
  if (position.x > 3 || position.y < 3) {
    return false;
  }
  for (i = 1; i < 4; i++) {
    var occupier = this.board.tiles[position.x + i][position.y - i].occupier;
    if (occupier == null || occupier.color !== color) {
      return false;
    }
  }
  return true;
};

module.exports = ConnectFourGame;