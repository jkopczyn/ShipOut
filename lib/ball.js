(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;

  var BALL_RADIUS = 8;
  var BALL_COLOR  ="#F44";

  var Ball = SO.Ball = function(box) {
    var newBox = {color: BALL_COLOR,
                  radius: BALL_RADIUS,
                  isBounceable: true,
                  };
    newBox.pos = box.pos;
    newBox.game = box.game;
    newBox.vel = box.vel || new SAT.Vector(0,0);
    SO.MovingObject.call(this,newBox);
  };
  SO.Util.inherits(Ball, SO.MovingObject);

  Ball.prototype.collideWith = function(otherObj, response) {
    this.pos.add(response.overlapV.scale(-2));
    if(response.overlapN.y) {
      this.vel.scale(1,-1);
    }
    if(response.overlapN.x) {
      this.vel.scale(-1,1);
    }
    this.vel.scale(1.03);
  };

  Ball.prototype.remove = function() {
    this.game.lives = (this.game.lives && this.game.lives -1) || 0;
    this.game.ball = undefined;
  };
})();
