'use strict';

angular.module('nagaretetter', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'd3'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/analysis', {
    templateUrl: 'views/analysis.html',
    controller: 'AnalysisCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
})
