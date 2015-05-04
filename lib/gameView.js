(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var INTRO_TEXT_COLOR = "#000";
  var ALL_KEYS = 'up, down, left, right, enter, space, q, w, e, r, t, y, u, i, o, p, a, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, =';
  var SO = window.ShipOut;

  var GameView = SO.GameView = function(ctx) {
    this.game = new SO.Game(ctx);
    this.ctx = ctx;
  };
  
  GameView.prototype.splashScreen = function() {
    this.game.drawBG();
    this.ctx.fillStyle = INTRO_TEXT_COLOR;
    this.ctx.font = "48px serif";
    this.ctx.fillText("Play ShipOut!", 180, 200);
    var whirlpool = window.ShipOut.whirlpoolImage = new Image();
    whirlpool.src = "img/blueWhirlpool2.png";
    var plank = window.ShipOut.plankImage = new Image();
    plank.src = "img/bigship.png";
    var block = window.ShipOut.blockImage = new Image();
    block.src = "img/canoe.png";
    var ball = window.ShipOut.ballImage = new Image();
    ball.src = "img/cannonball.png";
    var view = this;
    key(ALL_KEYS, function() {
      key.unbind(ALL_KEYS);
      view.start();
    });

  };

  GameView.prototype.start = function() {
    var view = this;
    this.bindKeyHandlers();
    setInterval(function() {
      view.game.step();
      view.game.draw();
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
