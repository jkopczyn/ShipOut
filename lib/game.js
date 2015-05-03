(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
  var Util = SO.Util;

  var BG_COLOR = "#999";
  var TEXT_COLOR = "#F00";
  var DIM_X = 700;
  var DIM_Y = 700;
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
   [[2,7,new SAT.Vector(2,0)], [6,15,new SAT.Vector(-2,0)]],
   [[1,5,new SAT.Vector(3,0)], [7,17,new SAT.Vector(-3,0)], [5,9,new SAT.Vector(-3,0)], [3,13,new SAT.Vector(3,0)]],
   ];

  var Game = SO.Game = function() {
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

    draw: function(ctx) {
      ctx = this.ctx = ctx || this.ctx;
      if(!this.wonLevel) {
        ctx.clearRect(0, 0, DIM_X, DIM_Y);
        ctx.fillStyle= BG_COLOR;
        ctx.fillRect(0,0, DIM_X, DIM_Y);
        ctx.drawImage(SO.backgroundImage, 
            0, 0, DIM_X, DIM_Y);
        this.objects().forEach(function(object) {
          object.draw(ctx);
        });
      } else {
        this.ctx.fillStyle = TEXT_COLOR;
        this.ctx.font = "48px serif";
        this.ctx.fillText("Level "+this.level+" complete!", 250, 400);
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
      //ball.checkEdges();
    },

    step: function() {
      if(this.playingGame) {
        this.moveObjects();
        this.checkCollisions();
        if(this.blocks.length === 0) {
          this.winLevel();
        }
      }
    },

    winLevel: function() {
      this.level += 1;
      this.wonLevel = true;
      this.playingGame = false;
      this.draw()
      setTimeout(function() {
        this.blocks = [];
        this.addBlocks();
        this.whirlpools = [];
        this.addWhirlpools();
        this.ball = undefined;
        this.playingGame = true;
        this.wonLevel = false;
      }.bind(this), 2000);
    },

    remove: function(object) {
      return SO.Util.remove(this.blocks, object) ||
        SO.Util.remove(this.whirlpools, object);
    },

    removeAll: function() {
      this.blocks.forEach(function(block) {
        this.remove(block);
      }.bind(this));
    },

    add: function(object) {
      if (object instanceof SO.Block) {
        this.blocks.push(object);
      } // else if (object instanceof SO.Whirlpool) {
        // this.whirlpools.push(object);
        // }
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
