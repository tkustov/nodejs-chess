module.exports = {
  controller: chessBoardController,
  templateUrl: 'board/board.component.html'
};

chessBoardController.$inject = [];
function chessBoardController(){
  var ctrl = this;
  ctrl.white = "#fff";
  ctrl.black = "#cc6600";

  ctrl.pieces = [ 
    { id: 1, name: 'rook', color: 'white', position: 'a1' },
    { id: 2, name: 'knight', color: 'white', position: 'b1' },
    { id: 3, name: 'bishop', color: 'white', position: 'c1' },
    { id: 4, name: 'queen', color: 'white', position: 'd1' },
    { id: 5, name: 'king', color: 'white', position: 'e1' },
    { id: 6, name: 'bishop', color: 'white', position: 'f1' },
    { id: 7, name: 'knight', color: 'white', position: 'g1' },
    { id: 8, name: 'rook', color: 'white', position: 'h1' },
    { id: 9, name: 'pawn', color: 'white', position: 'h2' },
    { id: 10, name: 'pawn', color: 'white', position: 'g2' },
    { id: 11, name: 'pawn', color: 'white', position: 'f2' },
    { id: 12, name: 'pawn', color: 'white', position: 'e2' },
    { id: 13, name: 'pawn', color: 'white', position: 'd2' },
    { id: 14, name: 'pawn', color: 'white', position: 'c2' },
    { id: 15, name: 'pawn', color: 'white', position: 'b2' },
    { id: 16, name: 'pawn', color: 'white', position: 'a2' },
    { id: 17, name: 'pawn', color: 'black', position: 'a7' },
    { id: 18, name: 'pawn', color: 'black', position: 'b7' },
    { id: 19, name: 'pawn', color: 'black', position: 'c7' },
    { id: 20, name: 'pawn', color: 'black', position: 'd7' },
    { id: 21, name: 'pawn', color: 'black', position: 'e7' },
    { id: 22, name: 'pawn', color: 'black', position: 'f7' },
    { id: 23, name: 'pawn', color: 'black', position: 'g7' },
    { id: 24, name: 'pawn', color: 'black', position: 'h7' },
    { id: 25, name: 'rook', color: 'black', position: 'h8' },
    { id: 26, name: 'knight', color: 'black', position: 'g8' },
    { id: 27, name: 'bishop', color: 'black', position: 'f8' },
    { id: 28, name: 'king', color: 'black', position: 'e8' },
    { id: 29, name: 'queen', color: 'black', position: 'd8' },
    { id: 30, name: 'bishop', color: 'black', position: 'c8' },
    { id: 31, name: 'knight', color: 'black', position: 'b8' },
    { id: 32, name: 'rook', color: 'black', position: 'a8' } 
  ];
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
     
    ctrl.getPosition = function (){
      var offsetLeft = event.currentTarget.offsetLeft + event.currentTarget.offsetParent.offsetLeft;
      var offsetTop = event.currentTarget.offsetTop + event.currentTarget.offsetParent.offsetTop;
      var clickX = event.clientX - offsetLeft;
      var clickY = event.clientY - offsetTop;
      ctrl.elementRanges.forEach(function(item){
        if(clickX > item.rangeX.firstX && clickX < item.rangeX.lastX 
          && clickY > item.rangeY.firstY && clickY < item.rangeY.lastY){
          var coordinatesFrom = document.getElementById("coordFrom");
          var coordinatesTo = document.getElementById("coordTo");
          var fromRows = coordinatesFrom.children[0].childElementCount;
          var toRows = coordinatesTo.children[0].childElementCount;
          var row;
          if(fromRows <= toRows && item.name !== "empty"){
            row = coordinatesFrom.insertRow();
            row.innerHTML = '<tr><td>'  + item.position + '</td></tr>';
            var form = item.position;
            console.log(form);
          }else if(fromRows > toRows){
            row = coordinatesTo.insertRow();
            row.innerHTML = '<tr><td>'  + item.position + '</td></tr>';
            var to = item.position;
            console.log(to);
          } 
        }
      });
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
  
  function letterToInt(let){
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
  
    return letter[let]
  }
  
  function intToLetter(idx){
    var letter = ['a','b','c','d','e','f','g','h'];
    return letter[idx]
  }
}
