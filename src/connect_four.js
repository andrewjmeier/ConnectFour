// Import the TableTop Framework
var TableTop = require('tabletop-boardgames');

// Import other needed classes
var ConnectFourGame = require("./connect_four_game.js");
var ConnectFourBoard = require("./connect_four_board.js");
var ConnectFourView = require("./connect_four_view.js");

// create the Board, Game, and TurnMap
var board = new ConnectFourBoard();
var game = new ConnectFourGame(board);

var view = new ConnectFourView(game);

//create our startView
var startView = new TableTop.StartView(game); 

// create our next player view
var nextPlayerView = new TableTop.NextPlayerView(game);

// create our game over view
var gameOverView = new TableTop.GameOverView(game);



var turnMap = new TableTop.ManualTurn(game, startView, view, gameOverView, nextPlayerView);
game.setTurnMap(turnMap);

// this initiates the TurnMap ("Gameloop") and 
// gets the ball rolling!
game.updateState("start");