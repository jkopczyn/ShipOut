(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var SO = window.ShipOut;

  var GameView = SO.GameView = function(ctx) {
    this.game = new SO.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    var view = this;
    this.bindKeyHandlers();
    setInterval(function() {
      view.game.step();
      view.game.draw(view.ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var plank = this.game.plank;
    var that = this;
    key('left', function() {
      plank.power(-5);
    });
    key('right', function() {
      plank.power(5);
    });
    key('down', function() {
      plank.power(0);
    });
    key('up', function() {
      plank.shootBall();
    });
    key('space', function() {
      plank.shootBall();
    });
    key('O', function() {
      that.game.removeAll();
    });
  };


})();
