var Player = function(settings) {
    // Settings
    var cannonElement = null;
    var playerElement = null;
    var cannonAngle = 0;
    var cannonPower = 0;

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
        playerElement.innerHTML = 'angle: ' + cannonAngle;
      }

      if(interactions.right){
        cannonElement.style.transform = 'rotate(' + (parseInt(cannonAngle)-1) + 'deg)';
        cannonAngle = (cannonAngle - 1)%360;
        playerElement.innerHTML = 'angle: ' + cannonAngle;
      }

      console.log(interactions.z);
      if(interactions.z){
        fire();
      }

      if(settings.walls){
        wall();
      }
    }

    function create() {
        // Create the object asset
    }

    function fire() {
      var bullet1 = new Bullet(settings,200,
        200,cannonPower,cannonAngle);
      console.log("fired!");
      console.log(bullet1);
      g.assets.push(bullet1);
    }

    function init(){
      // create();
      cannonElement = document.getElementById('cannon1');
      cannonElement.style.bottom = '75px';
      cannonElement.style.left = '415px';
      cannonElement.style.height = '50px';
      cannonElement.style.width = '20px';
      cannonElement.style.transform = 'rotate(0deg)';
      cannonAngle = 0;
      playerElement = document.getElementById('player1');
      playerElement.style.bottom = '50px';
      playerElement.style.left = '400px';
      playerElement.style.height = '50px';
      playerElement.style.width = '50px';

    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
