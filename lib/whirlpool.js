(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;

  var WHIRLPOOL_RADIUS = 8;

  var Whirlpool = SO.Whirlpool = function(box) {
    this.fetch_image():
    var newBox = {color: WHIRLPOOL_COLOR,
                  radius: WHIRLPOOL_RADIUS,
                  isBounceable: true,
                  };
    newBox.pos = box.pos;
    newBox.game = box.game;
    newBox.vel = box.vel || new SAT.Vector(0,0);
    SO.MovingObject.call(this,newBox);
  };
  SO.Util.inherits(Whirlpool, SO.MovingObject);

  Whirlpool.prototype.remove = function() {
    this.game.remove(this);
  };

  Whirlpool.prototype.fetch_image: function() {
  };

  Whirlpool.prototype.draw = function(ctx) {
    ctx.drawImage(SO.whirlpoolImage, 0, 0, 218, 218, 
        this.pos.x - this.r, this.pos.y-r, 2*r, 2*r);
  }
})();
