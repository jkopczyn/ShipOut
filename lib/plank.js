(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;

  var PLANK_RADIUS = 8;
  var PLANK_COLOR  ="#4F4";
  var INITIAL_BALL_SPEED = 3;

  var Plank = SO.Plank = function(box) {
    var newBox = {color: SHIP_COLOR, vel: new SAT.Vector(0,0)};
    newBox.pos = box.pos;
    newBox.game = box.game;
    SO.MovingObject.call(this,newBox);
  };
  SO.Util.inherits(Plank, SO.MovingObject);

  Plank.prototype.power = function(impulse) {
    if ((this.vel.x > 0 && impulse <= 0) ||  (this.vel.x < 0 && impulse => 0)) {
      this.vel.x = impulse; 
    } else {
      this.vel.x += impulse;
    }
  };

  move: function() {
    this.vel.scale(0.75,0);
    SO.MovingObject.prototype.move.call(this);
  }

  Plank.prototype.shootBall = function() {
    var plank = this;
    if (!this.game.hasBall()) {
      var box = {pos: plank.pos, game: plank.game, vel: plank.vel};
      box.vel[y] = INITIAL_BALL_SPEED;
      box.vel = Util.scaleVector(box.vel, INITIAL_BALL_SPEED);
      this.game.ball = new SO.Ball(box);
    }
 };

  })();
