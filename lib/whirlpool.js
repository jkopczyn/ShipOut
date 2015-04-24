(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;

  var WHIRLPOOL_RADIUS = 16;

  var Whirlpool = SO.Whirlpool = function(box) {
    var newBox = {radius: WHIRLPOOL_RADIUS,
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

  Whirlpool.prototype.draw = function(ctx) {
    var r = this.poly.r;
    ctx.drawImage(SO.whirlpoolImage, 
        this.pos.x - r, this.pos.y - r, 2*r, 2*r);
  };
})();
