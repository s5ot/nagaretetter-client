'use strict';
angular.module('nagaretetter')
.controller('AnalysisCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $rootScope.targetUrl = '#';
  $rootScope.targetLinkName = 'Main';

  $scope.init = function() {
    $http({method: 'GET', url: 'http://nagaretetter-server.herokuapp.com/songs/ranking_range.json'}).success(function(data) {
      $scope.range = data.ranking_range.range;
    });
  };

  $scope.init();
}]);
