module.exports = GameFactory;
var Board = require('../../../../lib/common/Board');
GameFactory.$inject = ['$http'];
function GameFactory($http)  {
    var board = new Board ();
    function getState() {
        
        return board.getState();
    }
    function getMoves(form) {
        return board.getMoves(form);
    }
    function tryMove(form, to) {
        console.log("GameFactory.tryMove",form, to);
        return board.tryMove(form, to);
    }
    function move(form, to) {
        return board.move(form, to);
    }
    return {
        getMoves: getMoves,
        tryMove: tryMove,
        move: move,
        getState: getState
    };
}