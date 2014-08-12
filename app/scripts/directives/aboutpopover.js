'use strict';

/**
 * @ngdoc directive
 * @name nagaretetter.directive:AboutPopover
 * @description
 * # AboutPopover
 */
angular.module('nagaretetter')
  .directive('aboutPopover', function () {
    return {
      link: function postLink(scope, element, attrs) {
        element.popover().on('click', function(e) {
          e.preventDefault();
        });
      }
    };
  });
