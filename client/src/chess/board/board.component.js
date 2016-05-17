module.exports = {
  controller: chessBoardController,
  templateUrl: 'board/board.component.html'
};

chessBoardController.$inject = ['Game', '$element', '$http', '$scope', 'user', 'sprites', '$q'];

function chessBoardController(Game, $element, $http, $scope, user, sprites, $q) {
  var $ctrl = this;
  $ctrl.sprites;
  $ctrl.white = "#fff";
  $ctrl.black = "#cc6600";
  $ctrl.pieces;
  $ctrl.color;
  $ctrl.moveFlag = true;
  $ctrl.whoMoves;

  sprites.then(function(res) {
    $ctrl.sprites = res;
  });
  $ctrl.getUserInfo = function() {
    var promise = $q(function(resolve, reject) {
      if (user.userInfo === null) {
        user.getUserInfo().
        then(function() {
          resolve(user.userInfo);
        });
      } else {
        resolve(user.userInfo);
      }
    });
    return promise;
  };
  var isFrom = true;
  var form;
  $scope.$watch(Game.getState, function(pieces) {
    if ($ctrl.pieces === undefined) {
      Game.getMovesList().
      then(Game.getBoardState).
      then(function(data) {
          $ctrl.pieces = data.boardState;
          $ctrl.initPieces($ctrl.pieces);
          $ctrl.whoMoves = data.playerColor;
          $ctrl.drawBoard($ctrl.ctx, $ctrl.canvasParams);
          if ($ctrl.sprites) {
            $ctrl.drawPieces($ctrl.ctx, $ctrl.pieces);
          } else {
            sprites.then(function(res) {
              $ctrl.drawPieces($ctrl.ctx, $ctrl.pieces);
            });
          }
        }).
        // then(user.getUserInfo).
      then(function() {
        $ctrl.getUserInfo().then(function(data) {
          $ctrl.user = data;
          if ($ctrl.user._id === Game.whitePlayer) {
            if ($ctrl.whoMoves === 'white') {
              $ctrl.moveFlag = true;
              Game.setMoveFlag($ctrl.moveFlag);
            } else {
              $ctrl.moveFlag = false;
              Game.setMoveFlag($ctrl.moveFlag);
            }
            Game.whitePlayerName = $ctrl.user.username;
            Game.setGameColor($ctrl.whoMoves);
          } else if ($ctrl.user._id === Game.blackPlayer) {
            Game.blackPlayerName = $ctrl.user.username;
            $ctrl.color = undefined;
            if ($ctrl.whoMoves === 'black') {
              $ctrl.moveFlag = true;
              Game.setMoveFlag($ctrl.moveFlag);
            } else {
              $ctrl.moveFlag = false;
              Game.setMoveFlag($ctrl.moveFlag);
            }
          }
        });
      });
    } else {
      $ctrl.pieces = pieces;
      $ctrl.drawBoard($ctrl.ctx, $ctrl.canvasParams);
      if ($ctrl.sprites) {
        $ctrl.drawPieces($ctrl.ctx, $ctrl.pieces);
      } else {
        sprites.then(function(res) {
          $ctrl.drawPieces($ctrl.ctx, $ctrl.pieces);
        });
      }
      $ctrl.getUserInfo().then(function(data) {
        $ctrl.user = data;
        if ($ctrl.user._id === Game.whitePlayer) {
          Game.whitePlayerName = $ctrl.user.username;
          Game.setGameColor('white');
        } else if ($ctrl.user._id === Game.blackPlayer) {
          Game.blackPlayerName = $ctrl.user.username;
          Game.setGameColor('black');
        }

      });
    }


  }, true);

  $ctrl.elementRanges = [];
  $ctrl.canvas = $element[0].querySelector('canvas');
  $ctrl.ctx = $ctrl.canvas.getContext('2d');

  $ctrl.canvasParams = {
    width: $ctrl.canvas.width,
    height: $ctrl.canvas.height
  };


  $ctrl.drawBoard = function(ctx, params) {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if ((i + j) % 2 == 0) {
          ctx.fillStyle = $ctrl.white;
        } else {
          ctx.fillStyle = $ctrl.black;
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
  $ctrl.fromNotAdded = true;
  $ctrl.color = Game.getGameColor();
  var click = {};
  var clickedElem = {};

  function getClickPosition(event) {
    var offsetLeft = event.currentTarget.offsetLeft + event.currentTarget.offsetParent.offsetLeft;
    var offsetTop = event.currentTarget.offsetTop + event.currentTarget.offsetParent.offsetTop;
    var clickX = event.clientX - offsetLeft;
    var clickY = event.clientY - offsetTop;
    click = {
      x: clickX,
      y: clickY
    };
  }

  function inRangeScope(element, i, array) {
    if (click.x > element.rangeX.firstX && click.x < element.rangeX.lastX &&
      click.y > element.rangeY.firstY && click.y < element.rangeY.lastY) {
      clickedElem = element;
      return true;
    }
    return false;
  }

  function displayFrom() {
    $ctrl.color = Game.getGameColor()
    if (getPieceColor(clickedElem.position) !== $ctrl.color) {
      console.log('don`t go');
      clickedElem = {};
      return;
    }
    form = clickedElem.position;
    isFrom = false;
  }

  function getPieceColor(position) {
    for (var i = 0; i < $ctrl.pieces.length; i++)
      if ($ctrl.pieces[i].position == position) {
        return $ctrl.pieces[i].color;
      }
  }

  function displayTo() {
    if (Game.tryMove(form, clickedElem.position)) {
      var tmp = {
        from: form,
        to: clickedElem.position
      };
      var tmpFlag = Game.getMoveFlag();
      if (tmpFlag !== null) {
        $ctrl.moveFlag = tmpFlag;
      }
      if ($ctrl.moveFlag) {
        Game.sendMove(tmp).
        then(function(prom) {
          if (prom.list === 201) {
            var tempFlag = !$ctrl.moveFlag;
            Game.setMoveFlag(tempFlag);
            Game.move(tmp.from, tmp.to);
            Game.setFactoryMoves({
              user: 'Your',
              form: tmp.from,
              to: tmp.to
            });
            console.log('Move from ' + tmp.from + ' to ' + tmp.to);
          }
        });
      }
    }
    isFrom = true;
  }

  $ctrl.getPosition = function(event) {
    getClickPosition(event);
    var isInRange = $ctrl.elementRanges.some(inRangeScope);
    if (isInRange) {
      isFrom && !Game.isFreeCell(clickedElem.position) ? displayFrom() : displayTo();
    }
    click = {};
    clickedElem = {};
  };

  $ctrl.initPieces = function(pieces) {
    $ctrl.elementRanges = [];
    var filed = true;
    for (var i = 0; i < pieces.length; i++) {
      var position = pieces[i].position;
      var columnLetter = position[0];
      var col = letterToInt(columnLetter);
      var row = Math.abs(parseInt(position[1] - 8));
      var tmp = $ctrl.canvasParams.width / 8;
      var x = tmp * col;
      var y = tmp * row;
      if (row === 1 && filed) {
        for (var r = 2; r < 6; r++) {
          for (var j = 0; j < 8; j++) {
            var realRow = Math.abs(r - 7);
            var realIdx = r + 1;
            var elementRange = {
              rangeX: {
                firstX: tmp * j,
                lastX: tmp * j + tmp
              },
              rangeY: {
                firstY: tmp * realRow,
                lastY: tmp * realRow + tmp
              },
              position: intToLetter(j) + realIdx,
              name: "empty"
            };
            $ctrl.elementRanges.push(elementRange);
          }
        }
        filed = false;
      }
      var elementRange = {
        rangeX: {
          firstX: x,
          lastX: x + tmp
        },
        rangeY: {
          firstY: y,
          lastY: y + tmp
        },
        position: position,
        name: pieces[i].name,
        color: pieces[i].color
      };
      $ctrl.elementRanges.push(elementRange);
    }
  };

  $ctrl.drawPieces = function(ctx, pieces) {
    for (var i = 0; i < pieces.length; i++) {
      var position = pieces[i].position;
      var columnLetter = position[0];
      var col = letterToInt(columnLetter);
      var row = Math.abs(parseInt(position[1] - 8));
      var tmp = $ctrl.canvasParams.width / 8;
      var x = tmp * col;
      var y = tmp * row;
      draw(ctx, x, y, pieces[i]);
    }
  };

  function draw(ctx, x, y, piece) {
    var imageData = $ctrl.sprites.pieces[piece.name][piece.color];
    var image = new Image();
    image.src = imageData;
    ctx.drawImage(image, x, y);
  }

  function letterToInt(lett) {
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

  function intToLetter(idx) {
    var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letter[idx];
  }
}