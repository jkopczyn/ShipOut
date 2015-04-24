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
    var vec = new SAT.Vector(0,length);
    var angle = Math.random() * 2 * Math.PI;
    vec.rotate(angle);
    return vec;
  };

  Util.scaleVector = function(vector, len) {
    vector.normalize(); vector.scale(len);
  };

  Util.fudgeVector = function(vector) {
    var smallAngle = Math.random() * Math.PI / 20 - (Math.PI / 40);
    vector.rotate(smallAngle);
  };

  Util.distance = function(pos1, pos2) {
    return new Vector(pos1, pos2).len();
  };

  Util.direction = function(vector) {
    return vector.normalize();
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
