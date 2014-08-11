'use strict';

/**
 * @ngdoc directive
 * @name nagaretetter.directive:whenScrolled
 * @description
 * # whenScrolled
 */
angular.module('nagaretetter')
.directive('whenScrolled', ['$window', function ($window) {
  return {
    scope: {
      loadMore: '='
    },
    link: function(scope, elem, attr) {
      var raw = elem[elem.length - 1];
      angular.element($window).bind('scroll', function() {
        if (raw.offsetTop + raw.offsetHeight < document.documentElement.scrollTop + window.innerHeight) {
          scope.loadMore();
        }
      });
    }
  };
}]);
