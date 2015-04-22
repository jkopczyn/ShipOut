(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var SO = window.ShipOut;

  var DIM_X = 800;
  var DIM_Y = 800;
  var NUM_BLOCKs = 0;
  var NUM_LIVES = 3;

  var Game = SO.Game = function() {
    this.blocks = [];
    this.addBlocks();
    this.plank = new SO.Plank({pos: this.middlePosition(), game: this});
    this.ball = new SO.Ball({pos: this.plank.pos, game: this});
    //this.whirlpools = [];
    //this.addWhirlpools();
  };

  Game.prototype = {
    addBlocks: function() {
      for (var i = 0; i < NUM_BLOCKS; i++) {
        //var newAst = new SO.Asteroid({ pos: this.randomPosition(), game: this });
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
      return [x, y];
    },

    draw: function(ctx) {
      ctx.clearRect(0, 0, DIM_X, DIM_Y);
      this.objects().forEach(function(object) {
        object.draw(ctx);
      });

    },

    objects: function() {
      return this.blocks.concat([this.plank, this.ball]);
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
      allThings.forEach(function(obj){
        if (obj.isCollidedWith(ball)) {
          obj.collideWith(ball);
        }
      });
      ball.checkEdges();
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

    outOfBound: function(pos) {
      return pos[0] < 0 || pos[0] > DIM_X || pos[1] < 0 || pos[1] > DIM_Y;
    }
  };


})();
