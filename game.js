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

    // World settings
    this.assets = [];                      // All game objects
    var player1 = new Player(settings);      // The player
    var player2 = new Player(settings);
    this.assets[0] = player1;
    this.assets[1] = player2;

    var frame = 0;                        // Frames since the start of the game
    var time = 0;
    var clockElement = null;
    clockElement = document.getElementById("clock");


    // Interactions
    var interactions = {};
    interactions.up = false;              // Up arrow key pressed
    interactions.down = false;            // Down arrow key pressed
    interactions.left = false;            // Left arrow key pressed
    interactions.right = false;           // Right arrow ket pressed
    interactions.z = false;           // Speace key pressed

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
          interactions.z = false;
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
          case "z":
          interactions.z = true;
          break;
          default:
          break;
        }
      });
    }

    // Startup the game
    function init(){
      setupEvents();

    }

    // function spawnBullet() {
    //   this.assets.push(new Bullet());
    // }

    // The render function. It will be called 60/sec
    this.render = function (){
      for(var i=0; i < this.assets.length; i++){
        this.assets[i].render(interactions);
      }

      frame++;
      time = Math.floor(frame/60);
      clockElement.innerHTML = frame;
      settings.frame = frame;
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
    })();

    init();
  }

  var g = new Game();
