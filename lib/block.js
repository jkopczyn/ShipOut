(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
  var Util = SO.Util = SO.Util || {};

  var BLOCK_COLOR = "#44F";
  var BLOCK_WIDTH = Util.BLOCK_WIDTH = 72;
  var BLOCK_HEIGHT = Util.BLOCK_HEIGHT = 21; 

  var Block = SO.Block = function(box) {
    var defaults = {color: BLOCK_COLOR, isBox: true, 
      width: BLOCK_WIDTH, height: BLOCK_HEIGHT };

    this.pos = new SAT.Vector(box.pos.x, box.pos.y);
    this.color = box.color || defaults.color;
    this.game = box.game;
    this.poly = new SAT.Box(this.pos, 
      box.width || defaults.width,
      box.height || defaults.height );
  };
  
  Block.prototype = {

  draw: function(ctx) {
    ctx.drawImage(SO.blockImage, 
        this.pos.x, this.pos.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    var pts = this.poly.toPolygon().calcPoints;
    },

    move: function() { },
  }

})();
