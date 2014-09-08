'use strict';

/**
 * @ngdoc directive
 * @name nagaretetter.directive:TwitterButton
 * @description
 * # Twitter
 */
angular.module('nagaretetter')
.directive('twitterButton', ['$timeout', 'YouTube', function ($timeout, YouTube) {
  return {
    link: function(scope, element, attr) {
      element.bind('$destroy', function() {
        var twitterScriptEl = angular.element('#twitter-wjs');
        twitterScriptEl.remove();
      });

      var titleAndArtist = attr.text.split(' - ');
      var promise = YouTube.query({
        title: titleAndArtist[0],
        artist: titleAndArtist[1]
      });
      promise.then(function(videoId) {
        var url = 'https://www.youtube.com/watch?v=' + videoId;
        twttr.widgets.createShareButton(
          attr.url,
          element[0],
          function(el) {}, {
            count: 'none',
            text: attr.text + ' ' + url,
            hashtags: attr.hashtags
          }
        );
      });
    }
  };
}]);
