var Game = function() {
    // Game settings
    var settings = {};                     // Containes all game settings
    settings.ballSpeed = 8;                // The speed of the ball
    settings.walls = true;                 // The ball can not go outside the screen
    settings.automatic = false;            // The ball will move by itself
    settings.godmode = false;              // Debug mode
    settings.gravity = 10;
    settings.frame = 0;
    settings.gameboard = document.getElementById("gameboard");
    settings.turn = 0;
    settings.player1hp = 100;
    settings.player2hp = 100;
    settings.win = false;
    
    //for player movement and also hitbox calculation
    settings.player1pos = {};
    settings.player1pos.x = 100;
    settings.player1pos.y = 0;
    settings.player2pos = {};
    settings.player2pos.x = 1100;
    settings.player2pos.y = 0;

    settings.bulletActive = false;

    // World settings
    this.assets = [];                      // All game objects

    var player1 = new Player1(settings, settings.player1pos.x, settings.player1pos.y);      // The player
    this.assets[0] = player1;

    var player2 = new Player2(settings, settings.player2pos.x, settings.player2pos.y);
    this.assets[1] = player2;

    var frame = 0;                        // Frames since the start of the game
    var time = 0;
    var clockElement = document.getElementById("clock");
    var turnElement = document.getElementById("turn");
    var p1HpElement = document.getElementById("player1hpVal");
    var p2HpElement = document.getElementById("player2hpVal");

    // Interactions
    var interactions = {};
    interactions.up = false;              // Up arrow key pressed
    interactions.down = false;            // Down arrow key pressed
    interactions.left = false;            // Left arrow key pressed
    interactions.right = false;           // Right arrow ket pressed
    interactions.z = false;           // Space key pressed

    // Setup event listeners
    function setupEvents() {
      document.addEventListener('keyup', function(event){
        var keyName = event.key;

        if(settings.bulletActive) {
          return;
        }

        if(settings.win){
          return;
        }

        switch(keyName) {
          case "ArrowRight":
          interactions.right = false;
          break;
          case "ArrowLeft":
          interactions.left = false;
          break;
          case "ArrowUp":
          interactions.up = false;
          break;
          case "ArrowDown":
          interactions.down = false;
          break;
          case "z":
          interactions.z = true;
          break;
          default:
          break;
        }
      });

      document.addEventListener('keydown', function(event){
        var keyName = event.key;

        if(settings.bulletActive) {
          return;
        }

        if(settings.win){
          return;
        }

        switch(keyName) {
          case "ArrowRight":
          interactions.right = true;
          break;
          case "ArrowLeft":
          interactions.left = true;
          break;
          case "ArrowUp":
          interactions.up = true;
          break;
          case "ArrowDown":
          interactions.down = true;
          break;
          // case "z":
          // interactions.z = true;
          // break;
          default:
          break;
        }
      });
    }

    // Startup the game
    function init(){
      setupEvents();
    }

    // turn checker function
    function turnChecker() {
      //if turn is even, display player1turn
      if (settings.turn%2==1) {
        turnElement.innerHTML = "Player 2's Turn!";
      } else if (settings.turn%2==0) {
        //turn is odd, display player2turn
        turnElement.innerHTML = "Player 1's Turn!";
      }
    }

    //this function is called in render, updates both player HP
    function updateHP() {
      p1HpElement.innerHTML = settings.player1hp;
      p2HpElement.innerHTML = settings.player2hp;
    }

    //called in render, to update the time and frames
    function handleTime() {
      frame++;
      time = Math.floor(frame/60);
      clockElement.innerHTML = frame;
      settings.frame = frame;
    }

    function checkWin() {
      if (settings.player1hp == 0) {
        //player 2 wins!
        turnElement.innerHTML = "Player 2 Wins!";
        settings.win = true;
      } else if (settings.player2hp == 0) {
        //player 1 wins!
        turnElement.innerHTML = "Player 1 Wins!";
        settings.win = true;
      }
    }

    // The render function. It will be called 60/sec
    this.render = function (){
      if (settings.turn%2==1) {
        this.assets[1].render(interactions);
      } if (settings.turn%2==0) {
        this.assets[0].render(interactions);
      }
      for(var i=2; i < this.assets.length; i++){
        this.assets[i].render(interactions);
      }

      handleTime();
      turnChecker();
      updateHP();
      checkWin();
    }

    var self = this;
    window.requestAnimFrame = (function(){
      return window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
    })();

    //loop
    (function animloop(){
      requestAnimFrame(animloop);
      self.render();
      console.log(settings.turn);
    })();

    init();
  }

  var g = new Game();
