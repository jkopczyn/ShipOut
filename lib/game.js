(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
  var Util = SO.Util;

  var ALL_KEYS = 'up, down, left, right, enter, space, q, w, e, r, t, y, u, i, o, p, a, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, =';
  var BG_COLOR = "#999";
  var SCOREBOX_COLOR = "#999";
  var VICTORY_TEXT_COLOR = "#F00";
  var LOSS_TEXT_COLOR = "#30F";
  var SCOREBOX_TEXT_COLOR = "#000";
  var DIM_X = Util.DIM_X = 700;
  var DIM_Y = Util.DIM_Y = 600;
  var SCOREBOX_Y = Util.SCOREBOX_Y = 50;
  var NUM_BLOCKS = 0;
  var NUM_LIVES = 3;
  var X_OFFSET = 0.30;
  var Y_OFFSET = 18;
  var PLANK_HEIGHT = Util.PLANK_HEIGHT; //defined in plank.js but also used here
  var BLOCK_HEIGHT = Util.BLOCK_HEIGHT; //defined in block.js
  var BLOCK_WIDTH  = Util.BLOCK_WIDTH;  //but also used here

 var BLOCK_LISTS = [
    [[0,10], [1,10], [2,10], [3,10], [4,10], [5,10], [6,10], [7,10], [8,10], [0,11], [1,11], [2,11], [3,11], [4,11], [5,11], [6,11], [7,11], [8,11], [0,12], [1,12], [2,12], [3,12], [4,12], [5,12], [6,12], [7,12], [8,12]],
    [[0,10], [1,10], [2,10], [3,10], [4,10], [5,10], [6,10], [7,10], [8,10], [0,11], [1,11], [2,11], [3,11], [4,11], [5,11], [6,11], [7,11], [8,11], [0,12], [1,12], [2,12], [3,12], [4,12], [5,12], [6,12], [7,12], [8,12]],
   ];

 var WHIRLPOOL_LISTS = [
   [[3,7,new SAT.Vector(2,0)], [5,15,new SAT.Vector(-2,0)]],
   [[1,5,new SAT.Vector(3,0)], [7,17,new SAT.Vector(-3,0)], [5,9,new SAT.Vector(-3,0)], [3,13,new SAT.Vector(3,0)]],
   ];

  var Game = SO.Game = function(ctx, view) {
    this.date = new Date();
    this.ctx = ctx;
    this.view = view;
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.LEFT_EDGE = new SAT.Polygon(new SAT.V(0,0), 
        [new SAT.V(0,0), new SAT.V(0, DIM_Y),
         new SAT.V(-50, DIM_Y), new SAT.V(-50,0)]);
    this.RIGHT_EDGE = new SAT.Polygon(new SAT.V(DIM_X,0), 
        [new SAT.V(0,0), new SAT.V(0,DIM_Y),
         new SAT.V(50, DIM_Y), new SAT.V(50,0)]);
    this.level = 0;
    this.lives = NUM_LIVES;
    this.score = 0;
    this.blocks = [];
    this.addBlocks();
    this.plank = new SO.Plank({pos: this.middlePosition(), game: this});
    this.ball = undefined;
    this.plank.shootBall();
    this.whirlpools = [];
    this.addWhirlpools();
    this.playingGame = true;
  };

  Game.prototype = {
    addBlocks: function() {
      var that = this;
      BLOCK_LISTS[this.level].forEach(function(coord) {
        var newBlock = new SO.Block({ pos: new SAT.Vector(
            (X_OFFSET+coord[0])*(BLOCK_WIDTH+1),
            (Y_OFFSET-coord[1])*(BLOCK_HEIGHT+1)),
            game: that});
      that.blocks.push(newBlock);
      });
    },

    addWhirlpools: function() {
      var that = this;
      WHIRLPOOL_LISTS[this.level].forEach(function(coord) {
        var newWhirlpool = new SO.Whirlpool({
          pos: new SAT.Vector(
          (X_OFFSET+coord[0])*(BLOCK_WIDTH+1),
          (Y_OFFSET-coord[1])*(BLOCK_HEIGHT+1)),
          game: that,
          vel: coord[2],
        });
      that.whirlpools.push(newWhirlpool);
      });
    },

    randomPosition: function() {
      var x = Math.random() * DIM_X;
      var y = Math.random() * DIM_Y;
      return [x, y];
    },
    
    middlePosition: function() {
      var  y =   DIM_Y - PLANK_HEIGHT;
      var  x =   DIM_X/2;
      return new SAT.Vector(x, y);
    },

    drawBG: function(ctx) {
      ctx = this.ctx = ctx || this.ctx;
      ctx.clearRect(0, 0, DIM_X, DIM_Y);
      ctx.fillStyle= BG_COLOR;
      ctx.fillRect(0,0, DIM_X, DIM_Y);
      this.drawScorebox(ctx);
      ctx.drawImage(SO.backgroundImage, 
          0, 0, DIM_X, DIM_Y);
    },

    drawScorebox: function(ctx) {
      ctx = this.ctx = ctx || this.ctx;
      ctx.fillStyle= SCOREBOX_COLOR;
      ctx.fillRect(0,DIM_Y, DIM_X, DIM_Y+SCOREBOX_Y);
      ctx.fillStyle = SCOREBOX_TEXT_COLOR;
      ctx.font = "24px serif";
      ctx.fillText("Score: "+this.score+"", 10, DIM_Y+SCOREBOX_Y-10);
      ctx.fillText("Lives: "+this.lives+"", DIM_X-90, DIM_Y+SCOREBOX_Y-10);

      ctx.font = "16px serif";
      ctx.fillText("Spacebar or Up arrow to fire", 260, DIM_Y+SCOREBOX_Y-25);
      ctx.fillText("Left and Right to move", 275, DIM_Y+SCOREBOX_Y-5);
    },

    draw: function(ctx) {
      ctx = this.ctx = ctx || this.ctx;
      if(!this.wonLevel) {
        this.drawBG(ctx);
          this.objects().forEach(function(object) {
            object.draw(ctx);
          });
      } else {
        this.ctx.fillStyle = VICTORY_TEXT_COLOR;
        this.ctx.font = "48px serif";
        this.ctx.fillText("Level "+this.level+" complete!", 180, 400);
        this.drawScorebox(ctx);
      }
    },

    obstacles: function() {
      //concat creates a new array, which push does not
      var objs = this.blocks.concat([this.plank]);
      if (this.whirlpools) {
        objs = objs.concat(this.whirlpools);
      }
      return objs;
    },

    movingObjects: function() {
      var objs = [this.plank]
      if (this.ball) {
        objs.push(this.ball);
      }
      if (this.whirlpools) {
        objs = objs.concat(this.whirlpools);
      }
      return objs;
    },

    objects: function() {
      return this.movingObjects().concat(this.blocks);
    },

    moveObjects: function() {
      this.movingObjects().forEach(function(obj) {
        obj.move();
      });
    },

    wrap: function(pos) {
      return [SO.Util.posMod(pos[0], DIM_X), SO.Util.posMod(pos[1], DIM_Y)];
    },

    checkCollisions: function() {
      var ball = this.ball;
      var allNonballThings = this.obstacles();
      var resp = new SAT.Response();
      allNonballThings.forEach(function(obj){
        resp.clear();
        if (ball && ball.isCollidedWith(obj, resp)) {
          ball.collideWith(obj, resp);
        }
      });
    },

    step: function() {
      if(this.playingGame) {
        if(this.lives <= 0) {
          this.loseGame();
        } else if(this.blocks.length === 0) {
          this.winLevel();
        } else {
          this.moveObjects();
          this.checkCollisions();
        }
      }
    },

    winLevel: function() {
      this.level += 1;
      this.wonLevel = true;
      this.playingGame = false;
      this.draw()
      setTimeout(function() {
        if (this.level >= BLOCK_LISTS.length) {
          this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
          this.score += this.lives * 10000
          this.wonLevel = false;
          clearInterval(this.view.intervalId);
          this.view.splashScreen();
        } else {
          this.blocks = [];
          this.addBlocks();
          this.whirlpools = [];
          this.addWhirlpools();
          this.ball = undefined;
          this.score += 1000
          this.playingGame = true;
          this.wonLevel = false;
        }
      }.bind(this), 2000);
    },

    loseGame: function() {
      clearInterval(this.view.intervalId);
      setTimeout(function() {
        this.ctx.fillStyle = LOSS_TEXT_COLOR;
        this.playingGame = false;
        this.ctx.font = "48px serif";
        this.ctx.fillText("You are sunk.", 220, 400);
        this.drawScorebox(this.ctx);
      }.bind(this), 0);
      var view = this.view;
      setTimeout(function() {
        view.splashScreen();
        view.prepareStart();
      }, 3000);
      //wait 1.5 seconds and then go back to the start screen
    },

    remove: function(object) {
      return SO.Util.remove(this.blocks, object) ||
        SO.Util.remove(this.whirlpools, object);
    },

    outOfBounds: function(poly) {
      var pos = poly.pos;      
      "test"
      if(pos.x < 0 || pos.x > DIM_X || pos.y < 0 || pos.y > DIM_Y) {
        return true;
      }
    },

    hasBall: function() {
      return !!this.ball
    }
  };


})();
