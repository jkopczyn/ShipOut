(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ast = window.Asteroids;

  var MO = window.Asteroids.MovingObject = function(obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
  };

  MO.prototype = {
    isWrappable: true,
    
    draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

      ctx.fill();
    },

    move: function() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      if (this.game.outOfBound(this.pos)) {
        if (this.isWrappable) {
          this.pos = this.game.wrap(this.pos);
        } else {
          this.game.remove(this);
        }
      }
    },

    isCollidedWith: function(otherObject) {
      var combinedRadius = this.radius + otherObject.radius;
      if(this === otherObject){
        return false;
      } else {
        return (Ast.Util.distance(this.pos, otherObject.pos) < combinedRadius);
      }
    },

    collideWith: function(otherObject) {    }

  };

})();
