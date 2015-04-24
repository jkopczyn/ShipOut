(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var MO = window.ShipOut.MovingObject = function(obj) {
    this.isBounceable = obj.isBounceable || false;
    this.pos = new SAT.Vector(obj.pos.x, obj.pos.y);
    if (obj.isBox) {
      this.poly = new SAT.Box(this.pos, obj.width, obj.height);
   } else {
      this.poly = new SAT.Circle(this.pos, obj.radius);
    }
    this.vel = new SAT.Vector(obj.vel.x, obj.vel.y);
    this.color = obj.color;
    this.game = obj.game;
  };

  MO.prototype = {
    
<<<<<<< HEAD
    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      if (this.poly instanceof SAT.Circle) {
        ctx.arc(this.poly.pos.x, this.poly.pos.y, 
                this.poly.r, 0, 2*Math.PI,false);
      } else if (this.poly instanceof SAT.Polygon) {
        var pts = this.poly.calcPoints;
     } else if (this.poly instanceof SAT.Box) {
        var pts = this.poly.toPolygon().calcPoints;
        ctx.moveTo(pts[0].x + this.pos.x, 
                   pts[0].y + this.pos.y);
        for(var i=1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x + this.pos.x, 
                     pts[i].y + this.pos.y);
        }
      } else {
        throw "Invalid Object Representation"
      }
      ctx.fill();
    },

=======
>>>>>>> master
    move: function() {
      this.poly.pos.add(this.vel);
      var resp = new SAT.Response();
      if (this.outOfBounds(this.game,resp)) {
        if (this.isBounceable) {
          this.bounce(resp);
        } else {
          this.keepInBounds(resp);
        }
      }
    },

    bounce: function() {
      var x = this.pos.x;
      var y = this.pos.y;
      if (x < 0 ) {
        this.pos.x = -1*this.pos.x;
        this.vel.x = -1*this.vel.x;
      } else if (x > this.game.DIM_X) {
        this.pos.x = (this.pos.x - this.game.DIM_X) * -1 + this.game.DIM_X;
        this.vel.x = -1*this.vel.x;
      }

      if (y < 0 ) {
        this.pos.y = -1*this.pos.y;
        this.vel.y = -1*this.vel.y;
      } else if (y > this.game.DIM_Y) {
        this.remove();
      }
      this.vel.scale(1.001);
    },

    keepInBounds: function() {
      this.pos.add(this.vel.scale(-0.5));
      this.vel = new SAT.V(0,0);
    },

    isCollidedWith: function(otherObject, resp) {
      var here = this.poly;
      var there = otherObject.poly;
      if (here instanceof SAT.Box) {
        here = here.toPolygon();
      }
      if (there instanceof SAT.Box) {
        there = there.toPolygon();
      }
      if (here instanceof SAT.Circle) {
        if (there instanceof SAT.Circle) {
          return SAT.testCircleCircle(here, there, resp);
        } else if (there instanceof SAT.Polygon) {
          return SAT.testCirclePolygon(here, there, resp);
        } else {
          throw "Invalid Object Representation"
        }
      } else if (here instanceof SAT.Polygon) {
        if (there instanceof SAT.Circle) {
          return SAT.testPolygonCircle(here, there, resp);
        } else if (there instanceof SAT.Polygon) {
          return SAT.testPolygonPolygon(here, there, resp);
        } else {
          throw "Invalid Object Representation"
        }
      } else {
        throw "Invalid Object Representation"
      }
    },

    outOfBounds: function(game) {
      if (this.poly instanceof SAT.Box) {
        var poly = this.poly.toPolygon();
      } else {
        var poly = this.poly;
      }
      if(poly instanceof SAT.Polygon) {
        var any = false;
        poly.points.forEach(function(point) {
          var pos = point.clone().add(poly.pos);
          var cond = pos.x < 0 || pos.x > game.DIM_X || 
                     pos.y < 0 || pos.y > game.DIM_Y;
          if (cond) {
            any = true;
          }
        }); 
      } else if (poly instanceof SAT.Circle) {
        return (poly.pos.x < poly.r || poly.pos.x > game.DIM_X - poly.r ||
            poly.pos.y < poly.r || poly.pos.y > game.DIM_Y - poly.r );
      }
      return any || this.game.outOfBounds(poly);
    },

    collideWith: function(otherObject) {    },
  };
})();
