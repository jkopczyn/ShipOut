(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var MO = window.ShipOut.MovingObject = function(obj) {
    this.isBouncable = false;
    this.pos = new SAT.Vector(obj.pos.x, obj.pos.y);
    if (obj.isBox) {
      this.poly = new SAT.Box(this.pos, obj.width, obj.height).toPolygon();
    } else {
      this.poly = new SAT.Circle(this.pos, obj.radius);
    }
    this.vel = new SAT.Vector(obj.vel.x, obj.vel.y);
    this.color = obj.color;
    this.game = obj.game;
  };

  MO.prototype = {
    
    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      if (this.poly instanceof SAT.Circle) {
        ctx.arc(this.poly.pos.x, this.poly.pos.y, this.poly.r, 0, 2*Math.PI,false);
      } else if (this.poly instanceof SAT.Polygon) {
        var newObj = new SAT.Polygon(this.poly.pos, this.poly.calcPoints);
        newObj.translate(this.poly.pos.x, this.poly.pos.y);
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
      if (this.poly instanceof SAT.Circle) {
        if (otherObject.poly instanceof SAT.Circle) {
          return SAT.testCircleCircle(this.poly, otherObject.poly, resp);
        } else if (otherObject.poly instanceof SAT.Polygon) {
          return SAT.testCirclePolygon(this.poly, otherObject.poly, resp);
        }
      } else if (this.poly instanceof SAT.Polygon) {
        if (otherObject.poly instanceof SAT.Circle) {
          return SAT.testPolygonCircle(this.poly, otherObject.poly, resp);
        } else if (otherObject.poly instanceof SAT.Polygon) {
          return SAT.testPolygonPolygon(this.poly, otherObject.poly, resp);
        }
      }
    },
    
    collideWith: function(otherObject) {    },
  };
})();
