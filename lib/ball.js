(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
  var Util = SO.Util;

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
    if( otherObj instanceof SO.Whirlpool ) {
      var newSpeed = this.vel.clone().len();
      var distance = this.poly.r + otherObj.poly.r;
      var newPos = otherObj.pos.clone();
      var heading = Util.randomVector(1);
      newPos.add(heading.clone().scale(distance));
      this.pos = this.poly.pos = newPos;
      this.vel = heading.clone().scale(newSpeed);
    } else {
      this.pos.add(response.overlapV.scale(-2));
      if(response.overlapN.y !== 0) {
        this.vel.scale(1,-1);
      }
      if(response.overlapN.x !== 0) {
        this.vel.scale(-1,1);
      }
      this.vel.scale(1.003);
      if(otherObj instanceof SO.Plank) {
        this.vel.add(otherObj.vel.scale(0.1));
      } else if (otherObj instanceof SO.Block) {
        this.game.remove(otherObj);
        this.game.score += 100
      }
    }
  };

  Ball.prototype.remove = function() {
    this.game.lives = (this.game.lives && this.game.lives -1) || 0;
    this.game.ball = undefined;
  };

  Ball.prototype.draw = function(ctx) {
    var r = this.poly.r;
    ctx.drawImage(SO.ballImage, 
        this.pos.x - r, this.pos.y - r, 2*r, 2*r);
  };

})();
