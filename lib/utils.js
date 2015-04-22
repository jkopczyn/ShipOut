(function() {
  if(typeof window.ShipOut === "undefined") {
    window.ShipOut = {};
  }
  var Util = window.ShipOut.Util = {};

  Util.inherits = function(SubClass, SuperClass) {
    function Surrogate() {
      this.constructor = SubClass;
    }
    Surrogate.prototype = SuperClass.prototype;
    SubClass.prototype = new Surrogate();
  };

  Util.randomVector = function(length) {
    var vec = SAT.Vector(0,length);
    var angle = Math.random() * 2 * Math.PI;
    vec.rotate(angle);
    return vec;
  };

  Util.scaleVector = function(vector, len) {
    vector.normalize(); vector.scale(len);
    return vector;
  };

  Util.distance = function(pos1, pos2) {
    return new Vector(pos1, pos2).len();
  };

  Util.direction = function(vector) {
    return vector.normalize();
  };

  //Util.posMod = function(base, modulus) {
  //  var m = base % modulus;
  //  if(m >= 0){
  //    return m;
  //  } else {
  //    return (m+modulus)%modulus;
  //  }
  //};

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
