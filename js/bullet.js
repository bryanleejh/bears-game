var Bullet = function(settings, startX, startY, power, angle) {
    // Settings
    var bulletElement = null;
    var Vx = 0;
    var Vy = 0;
    var radians = 0;
    console.log(startX + "bullet created");
    console.log(startY + "bullet created");
    this.y = startY;
    this.x = startX;
    console.log(this.y);
    console.log(this.x);
    this.width = 10;
    this.height = 10;
    var self = this;

    function wall() {
      //getBoundingClientRect determines boundaries
      var bulletRect = bulletElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth, 10);
      var h = parseInt(window.innerHeight, 10);

      if(bulletRect.bottom > h){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet);
        settings.bulletActive = false;
      }

      if(bulletRect.top < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet);
        settings.bulletActive = false;
      }

      if(bulletRect.left < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet);
        settings.bulletActive = false;
      }

      if(bulletRect.right > w){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet);
        settings.bulletActive = false;
      }
    }

    function move(interactions){
      //while no collision or no wall, keep flying
      var flightTime = settings.frame - startTime;
      flightTime = flightTime/12;
      self.x = startX + Vx * flightTime;
      //s = ut - 1/2at^2
      self.y = startY + Vy * flightTime - (0.5)*(settings.gravity)*(flightTime)*(flightTime);
      bulletElement.style.left = self.x + 'px';
      bulletElement.style.bottom = self.y + 'px';

      if(settings.walls){
        wall();
      }

      //checks for collision
      //collision();
    }

    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }

    function create(){

    }

    function init(){
      bulletElement = document.createElement('div');
      bulletElement.id = 'bulletElem';
      //starting position of bullet
      bulletElement.style.bottom = self.y + 'px';
      bulletElement.style.left = self.x + 'px';
      bulletElement.style.borderRadius = '50%';
      radians = toRadians(angle);
      Vx = power * Math.cos(radians); //how much its going up
      Vx = Math.floor(Vx);
      Vy = power * Math.sin(radians); //how much its going laterally
      Vy = Math.floor(Vy);
      height = Vy;
      startTime = settings.frame;
      document.getElementById('gameboard').appendChild(bulletElement);
    }

    this.render = function(){
      move();
    }

    init();
  }
