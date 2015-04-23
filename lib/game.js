(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;
  var Util = SO.Util;

  var DIM_X = 800;
  var DIM_Y = 800;
  var NUM_BLOCKS = 0;
  var NUM_LIVES = 3;
  var BLOCK_LISTS = [
    [[10,0], [10,1], [10,2], [10,3], [10,4], [10,5], [10,6], [10,7], [11,0], [11,1], [11,2], [11,3], [11,4], [11,5], [11,6], [11,7], [12,0], [12,1], [12,2], [12,3], [12,4], [12,5], [12,6], [12,7]],
  ];
  var X_OFFSET = 0.4;
  var Y_OFFSET = 10;
  var PLANK_HEIGHT = Util.PLANK_HEIGHT; //defined in plank.js but also used here
  var BLOCK_HEIGHT = Util.BLOCK_HEIGHT; //defined in block.js
  var BLOCK_WIDTH  = Util.BLOCK_WIDTH;  //but also user here

  var Game = SO.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.level = 0;
    this.lives = NUM_LIVES;
    this.blocks = [];
    this.addBlocks();
    this.plank = new SO.Plank({pos: this.middlePosition(), game: this});
    this.ball = undefined;
    this.plank.shootBall();
    //this.whirlpools = [];
    //this.addWhirlpools();
  };

  Game.prototype = {
    addBlocks: function() {
      var that = this;
      BLOCK_LISTS[this.level].forEach(function(coord) {
        var newBlock = new SO.Block({ pos: new SAT.Vector(
            (X_OFFSET+coord[0])*BLOCK_WIDTH,
            (Y_OFFSET+coord[1])*BLOCK_HEIGHT),
            game: that});
      that.blocks.push(newBlock);
      });
    },

    randomPosition: function() {
      var x = Math.random() * DIM_X;
      var y = Math.random() * DIM_Y;
      return [x, y];
    },
    
    middlePosition: function() {
      var y = DIM_Y - PLANK_HEIGHT;
      var x = DIM_X/2;
      return new SAT.Vector(x, y);
    },

    draw: function(ctx) {
      ctx.clearRect(0, 0, DIM_X, DIM_Y);
      this.objects().forEach(function(object) {
        object.draw(ctx);
      });

    },

    obstacles: function() {
      //concat creates a new array, which push does not
      var objs = this.blocks.concat([this.plank]);
      return objs;
    },

    objects: function() {
      var objs = this.obstacles();
      if (this.ball) {
        objs = objs.concat([this.ball]);
      }
      return objs;
    },

    moveObjects: function() {
      this.objects().forEach(function(obj) {
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
      this.moveObjects();
      this.checkCollisions();
    },

    remove: function(object) {
      return SO.Util.remove(this.blocks, object) 
        //|| SO.Util.remove(this.whirlpools, object);
    },

    add: function(object) {
      if (object instanceof SO.Block) {
        this.blocks.push(object);
      } // else if (object instanceof SO.Whirlpool) {
        // this.whirlpools.push(object);
        // }
    },

    outOfBounds: function(pos) {
      return pos.x < 0 || pos.x > DIM_X || pos.y < 0 || pos.y > DIM_Y;
    },

    hasBall: function() {
      return !!this.ball
    }
  };


})();
