'use strict';

/**
 * @ngdoc directive
 * @name nagaretetter.directive:whenScrolled
 * @description
 * # whenScrolled
 */
angular.module('nagaretetter')
.directive('whenScrolled', ['$window', '$timeout', function ($window, $timeout) {
  return {
    scope: {
      loadMore: '='
    },
    link: function(scope, elem, attr) {
      var raw = elem[elem.length - 1];
      var debounce;

      angular.element(raw).bind('scroll', function() {
        $timeout.cancel(debounce);
        debounce = $timeout(function() {
          if (raw.offsetTop + raw.offsetHeight < raw.scrollTop) {
            console.log('fire');
            scope.$emit('load_more', {});
          }
        }, 1000);
      });
    }
  };
}]);
