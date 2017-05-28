var Ball = function(settings) {

    // Settings
    var ballElement = null;
    var bullets = [];



    /*
    bottom:265
    height:100
    left:400
    right:500
    top:165
    width:100
*/

    function wall() {

      var ballRect = ballElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(ballRect.bottom > h){
        ballElement.style.top = (h-ballRect.height) + 'px';
      }

      if(ballRect.top < 0){
        ballElement.style.top = '0px';
      }

      if(ballRect.left < 0){
          ballElement.style.left = '0px';
      }

      if(ballRect.right > w){
          ballElement.style.left = ( w - ballRect.width) + 'px' ;
      }





    }

    // Move the ball around manually
    function move(interactions){

      if(interactions.up){
        ballElement.style.top = parseInt(ballElement.style.top)-8+"px";
      }

      if(interactions.down){
        ballElement.style.top = parseInt(ballElement.style.top)+8+"px";
      }

      if(interactions.left){
        ballElement.style.left = parseInt(ballElement.style.left)-8+"px";
      }

      if(interactions.right){
        ballElement.style.left = parseInt(ballElement.style.left)+8+"px";
      }

      if(settings.walls){
        wall();
      }
    }


    function create() {
        // Create the object asset
    }

    function init(){
      // create();
      ballElement = document.getElementById('ball');
      ballElement.style.top = '400px';
      ballElement.style.left = '400px';
      ballElement.style.height = '100px';

    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
