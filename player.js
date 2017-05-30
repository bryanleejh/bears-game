var Player = function(settings) {
    // Settings
    var cannonElement = null;
    var playerElement = null;
    var cannonAngle = 0;
    var cannonPower = 0;
    var adjustedAngle = 0;

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
        }
      }

      if(interactions.down){
        if (cannonPower > 0) {
        cannonPower = cannonPower - 1;
        cannonElement.innerHTML = cannonPower;
        }
      }

      //control cannon angle
      if(interactions.left){
        cannonElement.style.transform = 'rotate(' + (parseInt(cannonAngle)+1) + 'deg)';
        cannonAngle = (cannonAngle + 1)%360;
        adjustedAngle = 90 - cannonAngle;
        playerElement.innerHTML = 'angle: ' + adjustedAngle;
      }

      if(interactions.right){
        cannonElement.style.transform = 'rotate(' + (parseInt(cannonAngle)-1) + 'deg)';
        cannonAngle = (cannonAngle - 1)%360;
        adjustedAngle = 90 - cannonAngle;
        playerElement.innerHTML = 'angle: ' + adjustedAngle;
      }

      
      if(interactions.z){
        fire();
      }

      if(settings.walls){
        wall();
      }
    }

    function create() {
      // Create the object asset
      cannonElement = document.getElementById('cannon1');
      cannonElement.style.bottom = '25px';
      cannonElement.style.left = '115px';
      cannonElement.style.height = '50px';
      cannonElement.style.width = '20px';
      cannonElement.style.transform = 'rotate(0deg)';
      cannonAngle = 0;
      adjustedAngle = 90 - cannonAngle;
      playerElement = document.getElementById('player1');
      playerElement.style.bottom = '0px';
      playerElement.style.left = '100px';
      playerElement.style.height = '50px';
      playerElement.style.width = '50px';
    }

    function fire() {
      var bullet1 = new Bullet(settings,120,
        50,cannonPower,adjustedAngle);
      g.assets.push(bullet1);
    }

    function init(){
      create();
      

    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
