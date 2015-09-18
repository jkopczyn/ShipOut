(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }

  var INTRO_TEXT_COLOR = "#000";
  var ALL_KEYS = 'up, down, left, right, enter, space, q, w, e, r, t, y, u, i, o, p, a, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, =';
  var SO = window.ShipOut;

  var GameView = SO.GameView = function(ctx) {
    this.game = new SO.Game(ctx, this);
    this.ctx = ctx;
  };
  
  GameView.prototype.splashScreen = function() {
    this.game.drawBG();
    this.ctx.fillStyle = INTRO_TEXT_COLOR;
    this.ctx.font = "48px serif";
    this.ctx.fillText("Play ShipOut!", 210, 200);

    this.ctx.fillStyle= "#7AF";
    this.ctx.fillRect(215, 240, 260, 160);


    this.ctx.fillStyle = INTRO_TEXT_COLOR;
    this.ctx.font = "16px serif";
    this.ctx.fillText("Spacebar or Up arrow to fire", 250, 260);
    this.ctx.fillText("Left and Right to move", 265, 280);
    this.ctx.fillText("Break all the canoes!", 270, 300);
    this.ctx.fillText("Watch out for the whirlpools!", 250, 320);
 
    
    this.ctx.font = "24px serif";
    this.ctx.fillText("Press any key to begin!", 235, 380);
   
    
    var whirlpool = window.ShipOut.whirlpoolImage = new Image();
    whirlpool.src = "img/blueWhirlpool2.png";
    var plank = window.ShipOut.plankImage = new Image();
    plank.src = "img/bigship.png";
    var block = window.ShipOut.blockImage = new Image();
    block.src = "img/canoe.png";
    var ball = window.ShipOut.ballImage = new Image();
    ball.src = "img/cannonball.png";
  };

  GameView.prototype.prepareStart = function() {
    var view = this;
    key(ALL_KEYS, function() {
      key.unbind(ALL_KEYS);
      view.start();
    });
  };

  GameView.prototype.start = function() {
    var view = this;
    if (!this.game || !this.game.playingGame) {
      this.game = new SO.Game(this.ctx, this);
    }
    this.bindKeyHandlers();
    this.intervalId = setInterval(function() {
      view.game.step();
      view.game.draw();
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var plank = this.game.plank;
    var that = this;
    
    key('up', function() {
      plank.shootBall();
    });
    key('space', function() {
      plank.shootBall();
    });
  };

})();
