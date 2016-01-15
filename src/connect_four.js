// Import the TableTop Framework
var TableTop = require('tabletop-boardgames');

// Import other needed classes
var ConnectFourGame = require("./connect_four_game.js");
var ConnectFourBoard = require("./connect_four_board.js");
var ConnectFourView = require("./connect_four_view.js");

// create the players
var playerOne = new TableTop.Player("Alice", 0xFF0000);
var playerTwo = new TableTop.Player("Bob", 0x000000);
var players = [playerOne, playerTwo];

// create the Board, Game, and TurnMap
var board = new ConnectFourBoard();
var game = new ConnectFourGame(players, board);
var turnMap = new TableTop.ManualTurn(game);
game.setTurnMap(turnMap);

// create our view, and draw it
var view = new ConnectFourView(game, turnMap);
view.drawBoard();

// this initiates the TurnMap ("Gameloop") and 
// gets the ball rolling!
game.updateState("start");