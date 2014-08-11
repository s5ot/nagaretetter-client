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
      $http.jsonp('http://gdata.youtube.com/feeds/api/videos', {
        params: {
          q: query + ' -みた -コピ -カラオケ -ピアノ',
          'max-results': 2,
          format: 5,
          alt: 'json-in-script',
          callback: 'JSON_CALLBACK'
        }
      }).success(function(data) {
        if (data.feed.entry) {
          data.feed.entry.sort(function(a, b) {
            return b.favoriteCount - a.favoriteCount;
          });
          var permalink = data.feed.entry[0].id.$t;
          var videoId = permalink.match(/^.+\/(.+?)$/)[1];
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
