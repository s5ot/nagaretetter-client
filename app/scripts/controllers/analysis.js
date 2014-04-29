'use strict';
angular.module('nagaretetter')
.controller('AnalysisCtrl', function ($scope, $rootScope) {
  console.log($rootScope);
  $rootScope.targetUrl = '/';
  $rootScope.targetLinkName = 'Main';
});
