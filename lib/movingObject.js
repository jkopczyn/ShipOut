(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var MO = window.ShipOut.MovingObject = function(obj) {
    this.isBouncable = false;
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
  };

  MO.prototype = {
    
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
      this.pos[0] = this.pos[0] + this.vel[0];
      this.pos[1] = this.pos[1] + this.vel[1];
      if (this.game.outOfBounds(this.pos)) {
        if (this.isBouncable) {
          this.bounce();
        } else {
          this.keepInBounds();
        }
      }
    },

    bounce: function() {
      var x = this.pos[0];
      var y = this.pos[1];
      if (x < 0 ) {
        this.pos[0] = -1*this.pos[0];
        this.vel[0] = -1*this.vel[0];
      } else if (x > DIM_X) {
        this.pos[0] = (this.post[0] - DIM_X) * -1 + DIM_X;
        this.vel[0] = -1*this.vel[0];
      }

      if (y < 0 ) {
        this.pos[1] = -1*this.post[1];
        this.vel[1] = -1*this.vel[1];
      } else if (y > DIM_Y) {
        this.remove();
      }
    },

    keepInBounds: function() {
      var x = this.pos[0];
      var y = this.pos[1];
      if (x < 0 ) {
        this.pos[0] = 0;
      } else if (x > DIM_X) {
        this.pos[0] = DIM_X;
      }

      if (y < 0 ) {
        this.pos[0] = 0;
      } else if (y > DIM_Y) {
        this.pos[0] = DIM_Y;
      }
    },

    isCollidedWith: function(otherObject) {
      var combinedRadius = this.radius + otherObject.radius;
      if(this === otherObject){
        return false;
      } else {
        return (window.ShipOut.Util.distance(this.pos, otherObject.pos) < combinedRadius);
      }
    },

    collideWith: function(otherObject) {    }

  };

})();
