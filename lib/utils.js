(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ast = window.Asteroids;

  var Util = Ast.Util = {};

  Util.inherits = function(SubClass, SuperClass) {
    function Surrogate() {
      this.constructor = SubClass;
    }
    Surrogate.prototype = SuperClass.prototype;
    SubClass.prototype = new Surrogate();
  };

  Util.randomVector = function(length) {
    var vec = [null, null];
    var angle = Math.random() * 2 * Math.PI;
    vec[0] = length * Math.cos(angle);
    vec[1] = length * Math.sin(angle);
    return vec;
  };

  Util.distance = function(pos1, pos2) {
    return Math.sqrt(Math.pow(pos2[0]-pos1[0],2) + Math.pow(pos2[1]-pos1[1],2));
  };

  Util.direction = function(vector) {
    var length = Util.distance([0,0], vector);
    return [vector[0]/length, vector[1]/length];
  };

  Util.posMod = function(base, modulus) {
    var m = base % modulus;
    if(m >= 0){
      return m;
    } else {
      return (m+modulus)%modulus;
    }
  };

  Util.remove = function(array,item) {
    var index = array.indexOf(item);
    if(index === -1) {
      return false;
    } else {
      array.splice(index,1);
      return true;
    }
  };
})();
