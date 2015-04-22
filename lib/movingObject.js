(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var MO = window.ShipOut.MovingObject = function(obj) {
    this.isBouncable = false;
    this.pos = new SAT.Vector(obj.pos[0], obj.pos[1]);
    if (obj.isBox) {
      this.poly = new SAT.Box(pos, obj.width, obj.height).toPolygon();
    } else {
      this.poly = new SAT.Circle(pos, obj.radius);
    }
    this.vel = new SAT.Vector(obj.vel[0], obj.vel[1]);
    this.color = obj.color;
    this.game = obj.game;
  };

  MO.prototype = {
    
    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      if (this.obj instanceof SAT.Circle) {
        ctx.arc(this.obj.pos.x, this.obj.pos.y, this.obj.r, 0, 2*Math.PI,false);
      } else if (this.obj instanceof SAT.Polygon) {
        var newObj = new SAT.Polygon(this.obj.pos, this.obj.calcPoints);
        newObj.translate(pos.x, pos.y);
        newObj.pos = new SAT.Vector(0,0);
        var pts = newObj.points;
        ctx.moveTo(pts[0].x,pts[0].y);
        pts.forEach(function(point) {
          ctx.lineTo(point.x, point.y);
        });
      } else {
        throw "Invalid Object Representation"
      }
      ctx.fill();
    },

    move: function() {
      this.pos.add(this.vel);
      if (this.game.outOfBounds(this.pos)) {
        if (this.isBouncable) {
          this.bounce();
        } else {
          this.keepInBounds();
        }
      }
    },

    bounce: function() {
      var x = this.pos.x;
      var y = this.pos.y;
      if (x < 0 ) {
        this.pos.x = -1*this.pos.x;
        this.vel.x = -1*this.vel.x;
      } else if (x > DIM_X) {
        this.pos.x = (this.pos.x - DIM_X) * -1 + DIM_X;
        this.vel.x = -1*this.vel.x;
      }

      if (y < 0 ) {
        this.pos.y = -1*this.pos.y;
        this.vel.y = -1*this.vel.y;
      } else if (y > DIM_Y) {
        this.remove();
      }
    },

    keepInBounds: function() {
      var x = this.pos.x;
      var y = this.pos.y;

      if (x < 0 ) {
        this.pos.x = 0;
      } else if (x > DIM_X) {
        this.pos.x = DIM_X;
      }

      if (y < 0 ) {
        this.pos.x = 0;
      } else if (y > DIM_Y) {
        this.pos.x = DIM_Y;
      }
    },

    isCollidedWith: function(otherObject, resp) {
      if (this.obj instanceof SAT.Circle) {
        if (otherObject.obj instanceof SAT.Circle) {
          return SAT.testCircleCircle(this.obj, otherObject.obj, resp);
        } else if (otherObject.obj instanceof SAT.Polygon) {
          return SAT.testCirclePolygon(this.obj, otherObject.obj, resp);
        }
      } else if (this.obj instanceof SAT.Polygon) {
        if (otherObject.obj instanceof SAT.Circle) {
          return SAT.testPolygonCircle(this.obj, otherObject.obj, resp);
        } else if (otherObject.obj instanceof SAT.Polygon) {
          return SAT.testPolygonPolygon(this.obj, otherObject.obj, resp);
        }
      }
    },
    
    collideWith: function(otherObject) {    },
  };
})();
