module.exports = {
  controller: chessBoardController,
  templateUrl: 'board/board.component.html'
};

//var Board = require('../../../../lib/common/Board');
chessBoardController.$inject = ['Game', 'user', '$http'];
function chessBoardController(Game, user, $http){
  var ctrl = this;
  ctrl.white = "#fff";
  ctrl.black = "#cc6600";
  ctrl.pieces = Game.getState();

//// send request for Auth status. Redirect to /login if 401
  user.getUserStatus();
////
  var isFrom = true;
  var form;

	ctrl.elementRanges = [];
	ctrl.canvas = document.getElementById('chess');
	ctrl.ctx = ctrl.canvas.getContext('2d');

	ctrl.canvasParams = {
  		width : ctrl.canvas.width,
  		height : ctrl.canvas.height
	}

	ctrl.$onInit = function() {
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
  }
    ctrl.fromNotAdded = true;
    ctrl.getPosition = function (){

      var offsetLeft = event.currentTarget.offsetLeft + event.currentTarget.offsetParent.offsetLeft;
      var offsetTop = event.currentTarget.offsetTop + event.currentTarget.offsetParent.offsetTop;
      var clickX = event.clientX - offsetLeft;
      var clickY = event.clientY - offsetTop;

      for (var i=0;i< ctrl.elementRanges.length;i++){

        if(clickX > ctrl.elementRanges[i].rangeX.firstX && clickX < ctrl.elementRanges[i].rangeX.lastX
          && clickY > ctrl.elementRanges[i].rangeY.firstY && clickY < ctrl.elementRanges[i].rangeY.lastY){

          if (isFrom){

            form = ctrl.elementRanges[i].position;
            console.log("From :",form);
            isFrom = false;
            break;
          }
          else
          {

            console.log("To:",ctrl.elementRanges[i].position);

            if(Game.move(form,ctrl.elementRanges[i].position)){
              console.log("Moved To: " + ctrl.elementRanges[i].position);
              tmp = {from: form, to: ctrl.elementRanges[i].position }

              $http.get(process.env.API_URL + '/api/game/send-move/'+JSON.stringify(tmp), {withCredentials: true})
              .then(function(response) {
                // $ctrl.usersOnline = response.data;
              });

              ctrl.pieces = Game.getState();
              ctrl.$onInit();

            }
            isFrom = true;
            break;
          }
        }
      }
  }

  ctrl.drawPieces = function (ctx, pieces) {
    var filed = true;
    for (var i=0; i<pieces.length; i++){
      var position = pieces[i].position;
      var columnLetter = position[0];
      var col = letterToInt(columnLetter);
      var row = Math.abs(parseInt(position[1]-8));

      var tmp = ctrl.canvasParams.width/8;

      var x = tmp * col;
      var y = tmp * row;
      if(row===1 && filed){
        for(var r=2;r<6;r++){
          for(var j=0;j<8;j++){
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
        name: pieces[i].name
      };
      ctrl.elementRanges.push(elementRange);

      draw(ctx, x, y, pieces[i]);
    };

  }

  function draw(ctx, x, y, piece) {
    var base_image = new Image();
    var srcArr = [];
    base_image.src = piece.color === 'white'
                ? ctrl.piecesPaths.white[piece.name]
                : ctrl.piecesPaths.black[piece.name];
    base_image.onload = function(){
      ctx.drawImage(base_image, x, y);
    }
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
  }

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

    return letter[lett]
  }

  function intToLetter(idx){
    var letter = ['a','b','c','d','e','f','g','h'];
    return letter[idx]
  }
}
