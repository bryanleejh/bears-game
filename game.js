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
    // settings.playerXpos = 0;
    // settings.playerYpos = 0;

    // World settings
    this.assets = [];                      // All game objects

    // settings.playerXpos = 100;
    // settings.playerYpos = 0;
    var player1 = new Player1(settings, 100, 0);      // The player
    this.assets[0] = player1;

    // settings.playerXpos = 300;
    // settings.playerYpos = 0;
    var player2 = new Player2(settings, 900, 0);
    this.assets[1] = player2;

    var frame = 0;                        // Frames since the start of the game
    var time = 0;
    var clockElement = null;
    clockElement = document.getElementById("clock");
    var turnElement = null;
    turnElement = document.getElementById("turn");

    


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
          //while bullet is flying
          break;
          default:
          break;
        }
      });

      document.addEventListener('keydown', function(event){
        var keyName = event.key;

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
        turnElement.innerHTML = "player2turn";
      } else if (settings.turn%2==0) {
        //turn is odd, display player2turn
        turnElement.innerHTML = "player1turn";
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

      frame++;
      time = Math.floor(frame/60);
      clockElement.innerHTML = frame;
      settings.frame = frame;
      turnChecker();
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

    (function animloop(){
      requestAnimFrame(animloop);
      self.render();
      console.log(settings.turn);
    })();

    init();
  }

  var g = new Game();
