module.exports = {
  controller: chessBoardController,
  templateUrl: 'board/board.component.html'
};

//var Board = require('../../../../lib/common/Board');
chessBoardController.$inject = ['Game', '$element', '$http', '$scope', 'user'];
function chessBoardController(Game, $element, $http, $scope, user){
  var ctrl = this;
  ctrl.white = "#fff";
  ctrl.black = "#cc6600";
  ctrl.playerFlag;
  ctrl.player = Game.getGameInfo();
  console.log(ctrl.player);
  console.log(user.userInfo);
  if (user.userInfo._id === ctrl.player.whitePlayer) {
    ctrl.playerFlag = true;
  }
  else if (user.userInfo._id === ctrl.player.blackPlayer) {
    ctrl.playerFlag = false;
  }
  console.log(ctrl.playerFlag + ' players flag at the begining of a game');
  ctrl.pieces = Game.getState();
  function colorReverse(){
    ctrl.pieces.forEach(function(item){
      if(item.color) {
        item.color = item.color === 'white' ? 'white' : 'black';
        
      }
    });
  }

  var isFrom = true;
  var form;

  $scope.$watch(Game.getState, function (pieces) {
    ctrl.pieces = pieces;
    colorReverse();
    ctrl.drawBoard(ctrl.ctx, ctrl.canvasParams);
    ctrl.drawPieces(ctrl.ctx, ctrl.pieces);
  }, true);

	ctrl.elementRanges = [];
	ctrl.canvas = $element[0].querySelector('canvas');
	ctrl.ctx = ctrl.canvas.getContext('2d');

	ctrl.canvasParams = {
  		width : ctrl.canvas.width,
  		height : ctrl.canvas.height
	};

	ctrl.$onInit = function() {
	    colorReverse();
      ctrl.initPieces(ctrl.pieces);
    	ctrl.drawBoard(ctrl.ctx, ctrl.canvasParams);
    	ctrl.drawPieces(ctrl.ctx, ctrl.pieces);
	};

	ctrl.drawBoard = function (ctx, params) {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if ((i + j) % 2 == 0) {
          ctx.fillStyle = ctrl.white;
        } else {
          ctx.fillStyle = ctrl.black;
        }
        ctx.fillRect(i * (params.width / 8), j * (params.height / 8), params.width / 8, params.height / 8);
      }
    }
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    for (var i = 1; i < 8; i++) {
      ctx.beginPath();
      // draw horizontal line
      ctx.moveTo(0, i * (params.height / 8));
      ctx.lineTo(params.width, i * (params.height / 8));
      // draw vertical line
      ctx.moveTo(i * (params.width / 8), 0);
      ctx.lineTo(i * (params.width / 8), params.height);
      ctx.stroke();
    }
  };
  ctrl.fromNotAdded = true;
    var color = 'white';
    var click = {};
    var clickedElem = {};

  function getClickPosition(event){
    var offsetLeft = event.currentTarget.offsetLeft + event.currentTarget.offsetParent.offsetLeft;
    var offsetTop = event.currentTarget.offsetTop + event.currentTarget.offsetParent.offsetTop;
    var clickX = event.clientX - offsetLeft;
    var clickY = event.clientY - offsetTop;
    click = {x:clickX,y:clickY};
  }

  function inRangeScope(element, i, array){
    var empty = isFrom ? element.name !== "empty" : element.name === "empty";
    if(click.x > element.rangeX.firstX && click.x < element.rangeX.lastX
    && click.y > element.rangeY.firstY && click.y < element.rangeY.lastY && empty){
      clickedElem = element;
      return true;
    }
    return false;
  }

  function displayFrom(){
    if(clickedElem.color !== color) {
      console.log('don`t go');
      clickedElem = {};
      return;
    }
    form = clickedElem.position;
    console.log("From :", form);
    isFrom = false;
    color = color === 'black' ? 'white' : 'black';
  }

  function displayTo(){
    console.log("To:",clickedElem.position);
    if(Game.tryMove(form,clickedElem.position)){
      console.log("Moved To: " + clickedElem.position);
      var tmp = {from: form, to: clickedElem.position };
      Game.sendMove(tmp).
        then(function(prom) {
          if (prom.list === 201) {
            Game.move(tmp.from,tmp.to);
            ctrl.playerFlag = (!ctrl.playerFlag);
            console.log(ctrl.playerFlag + ' players flag after moving');
          }
          else {
            alert('Воу Воу парень ПАЛЄХЧЄ!!!');
          }
        });
    }
    isFrom = true;
  }

  ctrl.getPosition = function (event){
    ctrl.initPieces(ctrl.pieces);
    getClickPosition(event);
    var isInRange = ctrl.elementRanges.some(inRangeScope);
    if(isInRange){
      isFrom && !Game.isFreeCell(clickedElem.position) ? displayFrom() : displayTo();
    }
    click = {};
    clickedElem = {};
  };

  ctrl.getPositionRef = function (event) {
    ctrl.initPieces(ctrl.pieces);
  };

  ctrl.initPieces = function (pieces){
    ctrl.elementRanges = [];
    var filed = true;
    for (var i=0; i<pieces.length; i++){
      var position = pieces[i].position;
      var columnLetter = position[0];
      var col = letterToInt(columnLetter);
      var row = Math.abs(parseInt(position[1]-8));
      var tmp = ctrl.canvasParams.width/8;
      var x = tmp * col;
      var y = tmp * row;
      if(row === 1 && filed){
        for(var r=2; r<6; r++){
          for(var j=0; j<8; j++){
            var realRow = Math.abs(r-7);
            var realIdx = r+1;
            var elementRange = {
              rangeX: {firstX:tmp * j,lastX:tmp * j+tmp},
              rangeY: {firstY:tmp * realRow,lastY:tmp * realRow+tmp},
              position: intToLetter(j)+realIdx,
              name: "empty"
            };
            ctrl.elementRanges.push(elementRange);
          }
        }
        filed = false;
      }
      var elementRange = {
        rangeX: {firstX:x,lastX:x+tmp},
        rangeY: {firstY:y,lastY:y+tmp},
        position: position,
        name: pieces[i].name,
        color: pieces[i].color
      };
      ctrl.elementRanges.push(elementRange);
    }
  };

  ctrl.drawPieces = function (ctx, pieces) {
    for (var i=0; i<pieces.length; i++){
      var position = pieces[i].position;
      var columnLetter = position[0];
      var col = letterToInt(columnLetter);
      var row = Math.abs(parseInt(position[1]-8));
      var tmp = ctrl.canvasParams.width/8;
      var x = tmp * col;
      var y = tmp * row;
      draw(ctx, x, y, pieces[i]);
    }
  };

  function draw(ctx, x, y, piece) {
    var base_image = new Image();
    base_image.src = piece.color === 'white' ? ctrl.piecesPaths.white[piece.name] : ctrl.piecesPaths.black[piece.name];
    base_image.onload = function(){
      ctx.drawImage(base_image, x, y);
    };
  }

  ctrl.piecesPaths = {
    white: {
      king: "assets/images/king_w.png",
      queen: "assets/images/queen_w.png",
      rook: "assets/images/rook_w.png",
      bishop: "assets/images/bishop_w.png",
      knight: "assets/images/knight_w.png",
      pawn: "assets/images/pawn_w.png"
    },
    black: {
      king: "assets/images/king_b.png",
      queen: "assets/images/queen_b.png",
      rook: "assets/images/rook_b.png",
      bishop: "assets/images/bishop_b.png",
      knight: "assets/images/knight_b.png",
      pawn: "assets/images/pawn_b.png"
    }
  };

  function letterToInt(lett){
    var letter = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7
    };
    return letter[lett];
  }

  function intToLetter(idx){
    var letter = ['a','b','c','d','e','f','g','h'];
    return letter[idx];
  }
}
