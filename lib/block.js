(function() {
 if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
<<<<<<< HEAD
  var Util = SO.Util;
=======
  var Util = SO.Util = SO.Util || {};
>>>>>>> master

  var BLOCK_COLOR = "#44F";
  var BLOCK_WIDTH = Util.BLOCK_WIDTH = 81;
  var BLOCK_HEIGHT = Util.BLOCK_HEIGHT = 24; 

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
<<<<<<< HEAD
    draw: SO.MovingObject.prototype.draw,
=======

  draw: function(ctx) {
    ctx.drawImage(SO.blockImage, 
        this.pos.x, this.pos.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    var pts = this.poly.toPolygon().calcPoints;
    //ctx.beginPath();
    //ctx.moveTo(pts[0].x + this.pos.x, 
    //    pts[0].y + this.pos.y);
    //for(var i=1; i < pts.length; i++) {
    //  ctx.lineTo(pts[i].x + this.pos.x, 
    //      pts[i].y + this.pos.y);
    //}
    //ctx.closePath();
    //ctx.stroke();
  },
>>>>>>> master

    move: function() { },
  }

})();
