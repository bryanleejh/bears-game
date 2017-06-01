var Player2 = function(settings, playerX, playerY) {
    // Settings
    var cannonElement = null;
    var playerElement = null;
    var powerElement = null;
    var angleElement = null;
    var cannonAngle = 0;
    var cannonPower = 0;
    var adjustedAngle = 0;
    var bulletOriginFromBot = 0;
    var bulletOriginFromLeft = 0;

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

      if(settings.walls){
        wall();
      }
    }

    function create() {
      // Create the object asset
      powerElement = document.getElementById('player2power');
      angleElement = document.getElementById('player2angle');
      cannonElement = document.getElementById('cannon2');
      cannonElement.style.bottom = playerY + 25 + 'px'; //settings.playerXpos + 25 + px //25px
      cannonElement.style.left = playerX + 15 + 'px'; //settings.playerYpos + 15 + px //115px
      cannonElement.style.height = '50px';
      cannonElement.style.width = '20px';
      cannonElement.style.transform = 'rotate(0deg)';
      cannonAngle = 0;
      adjustedAngle = 90 - cannonAngle;
      playerElement = document.getElementById('player2');
      playerElement.style.bottom = playerY + 'px'; //settings.playerXpos + 'px' //0px
      playerElement.style.left = playerX + 'px'; //settings.playerYpos + 'px' //100px
      playerElement.style.height = '50px';
      playerElement.style.width = '50px';
      bulletOriginFromBot = playerY + 50; //settings.playerYpos + 50
      bulletOriginFromLeft = playerX + 20; //settings.playerXpos + 20
    }

    function fire() {
      settings.bulletActive = true;
      var bullet2 = new Bullet2(settings,bulletOriginFromLeft,
        bulletOriginFromBot,cannonPower,adjustedAngle);
      g.assets.push(bullet2);
      settings.turn++;
    }

    function init(){
      create();
    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
