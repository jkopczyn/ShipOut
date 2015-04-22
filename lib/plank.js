(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;

  var PLANK_COLOR = "#4F4";
  var PLANK_WIDTH = 75;
  var PLANK_HEIGHT = PLANK_HEIGHT; //defined in game.js for initialization
  var INITIAL_BALL_SPEED = 3;

  var Plank = SO.Plank = function(box) {
    var newBox = {color: PLANK_COLOR, vel: new SAT.Vector(0,0), 
      isBox: true, width: PLANK_WIDTH, height: PLANK_HEIGHT };
    newBox.pos = box.pos;
    newBox.game = box.game;
    SO.MovingObject.call(this,newBox);
  };
  SO.Util.inherits(Plank, SO.MovingObject);

  Plank.prototype.power = function(impulse) {
    if ((this.vel.x > 0 && impulse <= 0) ||  (this.vel.x < 0 && impulse >= 0)) {
      this.vel.x = impulse; 
    } else {
      this.vel.x += impulse;
    }
  };

  Plank.prototype.move = function() {
    this.vel.scale(0.75,0);
    SO.MovingObject.prototype.move.call(this);
  }

  Plank.prototype.shootBall = function() {
    var plank = this;
    if (!this.game.hasBall()) {
      var box = {pos: plank.pos, game: plank.game, vel: plank.vel.clone()};
      box.vel.y = INITIAL_BALL_SPEED;
      Util.scaleVector(box.vel, INITIAL_BALL_SPEED);
      Util.fudgeVector(box.vel)
      this.game.ball = new SO.Ball(box);
    }
 };

  })();
