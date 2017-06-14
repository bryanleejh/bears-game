var Player = function(settings, playerX, playerY, player) {
    // Settings
    console.log(playerX);
    console.log(playerY);
    var cannonElement = null;
    var playerElement = null;
    var powerElement = null;
    var angleElement = null;
    var cannonAngle = 0;
    var cannonPower = 0;
    var adjustedAngle = 0;
    var audio = new Audio('assets/cannon.mp3');
    var explode = new Audio('assets/explode.mp3');
    this.width = 50;
    this.height = 50;
    this.playerX = playerX;
    this.playerY = playerY;
    console.log(this.playerX + "player created");
    console.log(this.playerY + "player created");
    this.playerHP = 100;
    var self = this;

    function wall() {
      //getBoundingClientRect determines boundaries
      var cannonRect = cannonElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(cannonRect.bottom > h){
        cannonElement.style.top = (h-cannonRect.height) + 'px';
      }

      if(cannonRect.top < 0){
        cannonElement.style.top = '0px';
      }

      if(cannonRect.left < 0){
          cannonElement.style.left = '0px';
      }

      if(cannonRect.right > w){
          cannonElement.style.left = ( w - cannonRect.width) + 'px' ;
      }
    }

    this.collision = function(obj) {
      console.log("collision is called");
      console.log(typeof obj);
      switch (typeof obj) {
        case 'object':
          console.log("yes");
          this.playerHP -= 50;
          document.getElementById('gameboard').removeChild(bulletElem);
          g.assets.pop(Bullet);
          settings.bulletActive = false;
          explode.play();
        break;
        default:
        break;
      }
    }

    // Edit player settings around manually
    function move(interactions){
      //control cannon power
      if(interactions.up){
        if (cannonPower < 199) {
        cannonPower = cannonPower + 1;
        cannonElement.innerHTML = cannonPower;
        powerElement.innerHTML = cannonPower;
        }
      }

      if(interactions.down){
        if (cannonPower > 0) {
        cannonPower = cannonPower - 1;
        cannonElement.innerHTML = cannonPower;
        powerElement.innerHTML = cannonPower;
        }
      }

      //control cannon angle
      if(interactions.left){
        cannonElement.style.transform = 'rotate(' + (parseInt(cannonAngle)+1) + 'deg)';
        cannonAngle = (cannonAngle + 1)%360;
        adjustedAngle = 90 - cannonAngle;
        playerElement.innerHTML = 'angle: ' + adjustedAngle;
        angleElement.innerHTML = adjustedAngle;
      }

      if(interactions.right){
        cannonElement.style.transform = 'rotate(' + (parseInt(cannonAngle)-1) + 'deg)';
        cannonAngle = (cannonAngle - 1)%360;
        adjustedAngle = 90 - cannonAngle;
        playerElement.innerHTML = 'angle: ' + adjustedAngle;
        angleElement.innerHTML = adjustedAngle;
      }

      //on fire keyup, fire and set interactions false,
      //to prevent infinite firing
      if(interactions.space == true && (settings.bulletActive == false)){
        fire();
        interactions.space = false;
      }

      //move player left
      if(interactions.z) {
        self.playerX = self.playerX - 1;
        cannonElement.style.left = self.playerX + 15 + 'px';
        playerElement.style.left = self.playerX + 'px';
      }

      //move player right
      if(interactions.x) {
        self.playerX = self.playerX + 1;
        cannonElement.style.left = self.playerX + 15 + 'px';
        playerElement.style.left = self.playerX + 'px';
      }

      if(settings.walls){
        wall();
      }
    }

    function fire() {
      settings.bulletActive = true;
      var bullet = new Bullet(settings, (self.playerX + 20),
        (self.playerY + 50),cannonPower,adjustedAngle);
      console.log(self.playerX + "fired");
      console.log(self.playerY + "fired");
      
      g.assets.push(bullet);
      settings.turn++;
      audio.play();
    }

    function create(){

    }

    function init(){
      powerElement = document.getElementById('player' + player + 'power');
      angleElement = document.getElementById('player' + player + 'angle');
      cannonElement = document.getElementById('cannon' + player);
      cannonElement.style.bottom = self.playerY + 25 + 'px'; //settings.playerXpos + 25 + px //25px
      cannonElement.style.left = self.playerX + 15 + 'px'; //settings.playerYpos + 15 + px //115px
      cannonElement.style.height = '50px';
      cannonElement.style.width = '20px';
      cannonElement.style.transform = 'rotate(0deg)';
      cannonAngle = 0;
      adjustedAngle = 90 - cannonAngle;
      playerElement = document.getElementById('player' + player);
      playerElement.style.bottom = self.playerY + 'px'; //settings.playerXpos + 'px' //0px
      playerElement.style.left = self.playerX + 'px'; //settings.playerYpos + 'px' //100px
      playerElement.style.height = '50px';
      playerElement.style.width = '50px';
    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
