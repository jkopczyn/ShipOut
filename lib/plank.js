(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
  var Util = SO.Util;

  var PLANK_COLOR = "#4F4";
  var PLANK_WIDTH = 86;
  var PLANK_HEIGHT = PLANK_WIDTH/4; 
  Util.PLANK_HEIGHT = PLANK_HEIGHT;
  var INITIAL_BALL_SPEED = 6;

  var Plank = SO.Plank = function(box) {
    var newBox = {color: PLANK_COLOR, vel: new SAT.Vector(0,0), 
      isBox: true, width: PLANK_WIDTH, height: PLANK_HEIGHT };
    newBox.pos  = box.pos;
    newBox.pos.x = newBox.pos.x - PLANK_WIDTH/2
    newBox.game = box.game;
    SO.MovingObject.call(this,newBox);
  };
  SO.Util.inherits(Plank, SO.MovingObject);

  Plank.prototype.power = function(impulse) {
    if ((this.vel.x > -0.1 && impulse <= 0) ||  (this.vel.x < 0.1 && impulse >= 0)) {
      this.vel.x = impulse; 
    } else {
      this.vel.x += impulse;
    }
  };

  Plank.prototype.move = function() {
    this.vel.scaleRound(2,0.75,0);
    console.log(this.vel.x);
    SO.MovingObject.prototype.move.call(this);
  }

  Plank.prototype.shootBall = function() {
    var plank = this;
    if (!this.game.hasBall()) {
      var ballPos = plank.pos.clone().add(
          new SAT.Vector(0.5*PLANK_WIDTH, -1.1*PLANK_HEIGHT));
      var box = {pos: ballPos, game: plank.game, 
                 vel: plank.vel.clone().scale(0.2)};
      box.vel.y = -1* INITIAL_BALL_SPEED;
      Util.scaleVector(box.vel, INITIAL_BALL_SPEED);
      Util.fudgeVector(box.vel)
      this.game.ball = new SO.Ball(box);
    }
  };

  Plank.prototype.draw = function(ctx) {
    ctx.drawImage(SO.plankImage, 
        this.pos.x, this.pos.y, PLANK_WIDTH, PLANK_HEIGHT);
  };
})();
