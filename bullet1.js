var Bullet1 = function(settings, startX, startY, power, angle) {
    // Settings
    var bulletElement = null;
    var Vx = 0;
    var Vy = 0;
    var y = startY;
    var x = startX;
    var radians = 0;

    function wall() {
      //getBoundingClientRect determines boundaries
      var bulletRect = bulletElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(bulletRect.bottom > h){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }

      if(bulletRect.top < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }

      if(bulletRect.left < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }

      if(bulletRect.right > w){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }
    }

    function collision() {
      //getBoundingClientRect determines boundaries
      var bulletRect = bulletElement.getBoundingClientRect();
      var player2Rect = player2Element.getBoundingClientRect();

      if(bulletRect.bottom > h){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }

      if(bulletRect.top < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }

      if(bulletRect.left < 0){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }

      if(bulletRect.right > w){
        document.getElementById('gameboard').removeChild(bulletElement);
        g.assets.pop(Bullet1);
      }
    }

    function move(interactions){
      //while no collision or no wall, keep flying
      var flightTime = settings.frame - startTime;
      flightTime = flightTime/12;
      x = startX + Vx * flightTime;
      //s = ut - 1/2at^2
      y = startY + Vy * flightTime - (0.5)*(settings.gravity)*(flightTime)*(flightTime);
      bulletElement.style.left = x + 'px';
      bulletElement.style.bottom = y + 'px';

      if(settings.walls){
        wall();
      }

      //collision();

    }

    function create() {
        // Create the object asset
    }

    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }

    function init(){
      // create();
      player2Element = document.getElementById('player2');
      bulletElement = document.createElement('div');
      bulletElement.id = 'bulletElem1';
      //starting position of bullet
      bulletElement.style.bottom = y + 'px';
      bulletElement.style.left = x + 'px';
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