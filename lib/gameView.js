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
    key('left', function() {
<<<<<<< HEAD
      plank.power(-3);
    });
    key('right', function() {
      plank.power(3);
=======
      plank.power(-5);
    });
    key('right', function() {
      plank.power(5);
>>>>>>> master
    });
    key('down', function() {
      plank.power(0);
    });
    key('space', function() {
      plank.shootBall();
    });
  };


})();
