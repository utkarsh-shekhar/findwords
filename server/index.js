var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require('path');
const mongoose = require('mongoose');
const utils = require("./utils");

var dbURI = 'mongodb://localhost/findwords'; 
var connection = mongoose.connect(dbURI);
const grid = mongoose.model('Grid', { grid: Object, word_list: Object, count: String });
var game = undefined;
var gameStartTime = undefined
var stopTime = undefined;
var words = {}

const COLLDOWN = 1 * 1000;
const DURATION = 120 * 1000;
const UPDATE_LEADERBOARD = 2 * 1000;
const USERS = 10000;
const SAMPLE_SIZE = 10;


app.get("/", function(req, res){
  res.sendFile(path.resolve(__dirname+"/../client/index.html"));
});

http.listen(3000, function(){
  console.log("listening on *:3000");
});

const sendLeaderboard = function() {
  if (game) {
    io.emit("leaderboard", game["leaderboard"])
  }
}

const calculateScore = async function(msg) {
  const word = msg["word"];
  const userId = parseInt(msg["_id"], 16) % USERS;
  let newScore;
  let alreadyFound = false;
  if (words[userId] !== undefined && words[userId].includes(word)) {
    newScore = 0;
    alreadyFound = false;
  }
  newScore = utils.getScore(game["grid"], game["word_list"], word);
  const score = game["leaderboard"][userId] + newScore;
  game["leaderboard"][userId] = score;
  socket.emit("socre", {"user_id": userId, "score": score, "valid": newScore > 0, "already_found": alreadyFound})
}

const stopGame = async function() {
  console.log("stoping game")
  io.emit("game ended")
  gameStartTime = game = undefined;
  setTimeout(startGame, COLLDOWN)
}

const startGame = async function() {
  grid.find().skip(parseInt(Math.random() * 10)).limit(1).then(function(result) {
    newGame = game = result[0];
    gameStartTime = Date.now();
    game["leaderboard"] = {}
    newGame["word_list"] = undefined;
    io.emit("game started", {"grid": game["grid"], "time_left": DURATION});
    setTimeout(stopGame, DURATION);
  })
}

setInterval(sendLeaderboard, UPDATE_LEADERBOARD);

io.on("connection", function(socket){
  console.log("a user connected");

  if(game && gameStartTime)  {
    timeLeft = DURATION + gameStartTime - Date.now();
    socket.emit("game started", {"grid": game["grid"], "time_left": timeLeft});
  }

  socket.on("calculate score", calculateScore);
  socket.on("disconnect", function(){
    console.log("user disconnected");
  });
});

startGame();