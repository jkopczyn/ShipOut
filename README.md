# ShipOut
A pure-Javascript Breakout clone.

Main code is written in no-frameworks Javascript as an exercise in jQuery-less
JS code.

Input is managed by [keymaster.js](https://github.com/madrobby/keymaster), and collision detection by [SAT.js](https://github.com/jriecken/sat-js).

Game design reflects the original Breakout closely; whirlpools randomize
direction and slow the movement of the cannonball.

Arrow keys to move the ship and fire a new cannonball (if the last one has been
lost); spacebar will also fire.
