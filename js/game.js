var Game = function() {
    var settings = {};                     // Containes all game settings
    settings.ballSpeed = 8;                // The speed of the ball
    settings.walls = true;                 // The ball can not go outside the screen
    settings.automatic = false;            // The ball will move by itself
    settings.godmode = false;              // Debug mode
    settings.gravity = 10;
    settings.frame = 0;
    settings.turn = 0;
    settings.win = false;
    settings.audio = true; //playing
    settings.player1pos = {};
    settings.player1pos.x = 100;
    settings.player1pos.y = 0;
    settings.player2pos = {};
    settings.player2pos.x = 1100;
    settings.player2pos.y = 0;
    settings.bulletActive = false;

    this.assets = [];                      // All game objects
    var player1 = new Player(settings, settings.player1pos.x, settings.player1pos.y, "1");      // The player
    this.assets.push(player1);
    var player2 = new Player(settings, settings.player2pos.x, settings.player2pos.y, "2");
    this.assets.push(player2);

    var frame = 0;                        // Frames since the start of the game
    var time = 0;
    var clockElement = document.getElementById("clock");
    var turnElement = document.getElementById("turn");
    var p1HpElement = document.getElementById("player1hpVal");
    var p2HpElement = document.getElementById("player2hpVal");
    var bgmAudio = new Audio('assets/mario.mp3');

    var interactions = {};
    interactions.up = false;              // Up arrow key pressed
    interactions.down = false;            // Down arrow key pressed
    interactions.left = false;            // Left arrow key pressed
    interactions.right = false;           // Right arrow ket pressed
    interactions.z = false;           // Space key pressed
    interactions.reset = false;

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
          case " ":
          //interactions.space is disabled elsewhere
          interactions.space = true;
          break;
          case "z":
          interactions.z = false;
          break;
          case "x":
          interactions.x = false;
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
          case "z":
          interactions.z = true;
          break;
          case "x":
          interactions.x = true;
          break;

          default:
          break;
        }
      });

      document.getElementById("audio-btn").addEventListener('click', function(){
        settings.audio = !settings.audio;
        if (settings.audio) {
          bgmAudio.play();
        } else {
          bgmAudio.pause();
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
      if (settings.turn%2===1) {
        turnElement.innerHTML = "Player 2's Turn!";
      } else if (settings.turn%2===0) {
        //turn is odd, display player2turn  
        turnElement.innerHTML = "Player 1's Turn!";
      }
    }

    //this function is called in render, updates both player HP
    function updateHP() {
      p1HpElement.innerHTML = player1.playerHP;
      p2HpElement.innerHTML = player2.playerHP;
    }

    //called in render, to update the time and frames
    function handleTime() {
      frame++;
      time = Math.floor(frame/60);
      clockElement.innerHTML = frame;
      settings.frame = frame;
    }

    function checkWin() {
      if (player1.playerHP === 0) {
        //player 2 wins!
        turnElement.innerHTML = "Player 2 Wins!";
        settings.win = true;
        document.getElementById('reset-btn').style.display = 'block';
      } else if (player2.playerHP === 0) {
        //player 1 wins!
        turnElement.innerHTML = "Player 1 Wins!";
        settings.win = true;
        document.getElementById('reset-btn').style.display = 'block';
      }
    }

    //player collide with object
    function collision(obj1, obj2) {
      console.log(obj1 + "obj");
      console.log(obj2 + "obj");
      var rect1 = {x: obj1.playerX, y: obj1.playerY, width: obj1.width, height: obj1.height} //player
      var rect2 = {x: obj2.x, y: obj2.y, width: obj2.width, height: obj2.height} //projectile
      console.log(rect1.x);
      console.log(rect1.y);
      console.log(rect2.x);
      console.log(rect2.y);
      
      console.log(rect1 + "rect");
      console.log(rect2 + "rect");

      if ((rect1.x < rect2.x + rect2.width) && (rect1.x + rect1.width > rect2.x) &&
       (rect1.y < rect2.y + rect2.height) && (rect1.height + rect1.y > rect2.y)) {
        // if overlap exists, call the collision function
        console.log("collision detected");
        obj1.collision(obj2);
      //by right obj2.collision(obj1) as well
      }
    }

    // The render function. It will be called 60/sec
    this.render = function (){
      // if odd turn, move player 2
      if (settings.turn%2===1) {
        this.assets[1].render(interactions);
      } 
      // if even turn, move player 1
      if (settings.turn%2===0) {
        this.assets[0].render(interactions);
      }
      // render bullet and deal with collision
      for(var i=2; i < this.assets.length; i++){
        this.assets[i].render(interactions);
          // if turn is odd, check collision with bullet and player 1
          if (settings.turn%2===1) {
            if(this.assets.length > 2) {
              collision(this.assets[1], this.assets[2]);
            }
          }
          // if turn is even, check collision with bullet and player 2
          if (settings.turn%2===0) {
            if(this.assets.length > 2) {
              collision(this.assets[0], this.assets[2]);
            }
          }
      }
      handleTime();
      turnChecker();
      updateHP();
      checkWin();
      // player.collision(bullet);
      if (settings.audio) {
        bgmAudio.play();
      }
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
