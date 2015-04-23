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
  var PLANK_HEIGHT = Util.PLANK_HEIGHT;//defined in plank.js but also used here

  var Game = SO.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.blocks = [];
    this.addBlocks();
    this.plank = new SO.Plank({pos: this.middlePosition(), game: this});
    this.ball = undefined;
    this.plank.shootBall();
    this.lives = NUM_LIVES;
    //this.whirlpools = [];
    //this.addWhirlpools();
  };

  Game.prototype = {
    addBlocks: function() {
      for (var i = 0; i < NUM_BLOCKS; i++) {
      //var newAst = new SO.Asteroid({ pos: this.randomPosition(), game: this});
      //this.asteroids.push(newAst);
      }
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

    objects: function() {
      //concat creates a new array, which push does not
      var objs = this.blocks.concat([this.plank]);
      if (this.hasBall()) {
        objs.push(this.ball);
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
      var allThings = this.objects();
      var resp = new SAT.Response();
      allThings.forEach(function(obj){
        resp.clear();
        if (ball.isCollidedWith(obj, resp)) {
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
