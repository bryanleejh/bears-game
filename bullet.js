var Bullet = function(settings, x, y, power, angle) {
    // Settings
    var bulletElement = null;
    var bulletDX = 0;
    var bulletDY = 0;
    var bulletRadians = 0;
    var height = 0;

    function wall() {
      //getBoundingClientRect determines boundaries
      var bulletRect = bulletElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(bulletRect.bottom > h){
        bulletElement.style.top = (h-bulletRect.height) + 'px';
      }

      if(bulletRect.top < 0){
        bulletElement.style.top = '0px';
      }

      if(bulletRect.left < 0){
          bulletElement.style.left = '0px';
      }

      if(bulletRect.right > w){
          bulletElement.style.left = ( w - bulletRect.width) + 'px' ;
      }
    }

    // Move the ball around manually
    function move(interactions){
      //change in x positive, move right
      if(bulletDX>0){
        bulletElement.style.left = parseInt(bulletElement.style.left)+1+'px';
        console.log(bulletElement.style.left);
        bulletDX = bulletDX - 1;
      }

      //change in x negative, move left
      if(bulletDX<0){
        bulletElement.style.left = parseInt(bulletElement.style.left)+1+'px';
        console.log(bulletElement.style.left);
        bulletDX = bulletDX + 1;
      }

      //change in y positive, move up
      if(bulletDY>0){
        bulletElement.style.top = parseInt(bulletElement.style.top)-1+'px';
        console.log(bulletElement.style.top);
        bulletDY = bulletDY - 1;
      }

      if(bulletDY==0){
        if(height>0) {
          bulletElement.style.top = parseInt(bulletElement.style.top)+1+'px';
          console.log(bulletElement.style.top);
          height = height - 1;
        }
      }

      if(settings.walls){
        wall();
      }
    }

    function create() {
        // Create the object asset
    }

    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }

    function init(){
      // create();
      bulletElement = document.createElement('div');
      bulletElement.className = 'bullet';
      //starting position of bullet
      bulletElement.style.top = y + 'px';
      bulletElement.style.left = x + 'px';
      bulletRadians = toRadians(angle);
      console.log(bulletRadians);
      bulletDX = power * Math.cos(bulletRadians); //how much its going up
      bulletDX = Math.floor(bulletDX);
      console.log(bulletDX);
      bulletDY = power * Math.sin(bulletRadians); //how much its going laterally
      bulletDY = Math.floor(bulletDY);
      height = bulletDY;
      console.log(bulletDY);
      document.getElementById('gameboard').appendChild(bulletElement);
      // bulletElement = document.getElementById('ball');
      // bulletElement.style.top = '100px';
      // bulletElement.style.left = '400px';
      // bulletElement.style.height = '10px';
      // bulletElement.style.width = '100px';
      // bulletElement.style.transform = 'rotate(0deg)';
      // ballRotation = 0;
    }

    this.render = function(interactions){
      move(interactions);
      console.log("move called");
    }

    init();
}
