'use strict';

/**
 * @ngdoc service
 * @name nagaretetter.YouTube
 * @description
 * # YouTube
 * Service in the nagaretetter.
 */
angular.module('nagaretetter')
.service('YouTube', ['$window', '$http', '$q', function ($window, $http, $q) {
  return {
    ready: false,
    player: null,
    currentVideoId: null,

    query: function(song) {
      var deferred = $q.defer();
      var query = song.title + ' ' + song.artist;
      $http.jsonp('https:///www.googleapis.com/youtube/v3/videos', {
        params: {
          q: query + ' -みた -コピ -カラオケ -ピアノ',
          'maxResults': 1,
          callback: 'JSON_CALLBACK',
          part: 'snippet,statistics',
          type: 'video',
          videoDefinition: 'high',
          videoEmbeddable: true,
          chart: 'mostPopular',
          key: 'AIzaSyAed5y3Syl_LLEDE9L5H9z20ridgfib5c0'
        }
      }).success(function(data) {
        if (data.items[0]) {
          var videoId = data.items[0].id.videoId;
          deferred.resolve(videoId);
        } else {
          deferred.reject();
        }
      }).error(function(error) {
        // Do nothing
      });

      return deferred.promise;
    },

    play: function(song, callback) {
      var deferred = $q.defer();
      var that = this;
      //var query = song.title + ' ' + song.artist;

      var promise = this.query(song);
      promise.then(function(videoId) {
        if (that.ready) {
          that.player.clearVideo();
          that.player.loadVideoById(videoId);
        } else {
          that.player = new YT.Player('player', {
            height: '400',
            width: '600',
            videoId: videoId,
            playerVars: {
              'autoplay': 1,
              'rel': 0
            },
            events: {
              onStateChange: function(event) {
                if (event.data == YT.PlayerState.ENDED) {
                  callback();
                }
              }
            }
          });
          that.ready = true;
        }
      }, function() {
        callback();
      });
    }
  };
}]);
