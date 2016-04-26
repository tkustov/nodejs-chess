var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/board');

describe('module: chess.board', function () {
    beforeEach(angular.mock.module('chess.board'));
    
    describe('board component', function() {
        var scope, controller, element;
        beforeEach(inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put(
                'board/board.component.html',
                '<canvas id="chess" width="500" height="500" ng-click="$ctrl.getPosition($event)"></canvas>'
            );
            scope = $rootScope.$new();
            element = $compile('<chess-canvas></chess-canvas>')(scope);
            scope.$digest();
            controller = element.controller('chessCanvas');
        }));
        it('should has colors properties', function () {
            assert.equal(controller.white, '#fff');
            assert.equal(controller.black, '#cc6600');
        });
    });
});
