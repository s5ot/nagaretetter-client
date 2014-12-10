'use strict';

angular.module('nagaretetter', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'd3',
  'ui.router'
])
/*
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainController'
  })
  .when('/analysis', {
    templateUrl: 'views/analysis.html',
    controller: 'AnalysisController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
*/
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      controller: function ($state) {
        $state.go('main', null, { reload: true });
      }
    })
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .state('analysis', {
      url: '/analysis',
      templateUrl: 'views/analysis.html'
    });
});
