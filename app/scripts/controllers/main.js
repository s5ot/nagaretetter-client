'use strict';
angular.module('jwaveyarouClientApp')
.run(function(){
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var first_tag = document.getElementsByTagName('script')[0];
  first_tag.parentNode.insertBefore(tag, first_tag);

  $('a[href=#about]').popover().on('click', function(e){e.preventDefault();});
})
.service('YouTube', function($window, $http){
  this.ready = false;

  this.player = null;

  this.play = function(song, callback) {
    var that = this;
    var query = song.title + ' ' + song.artist;
    $http.jsonp('http://gdata.youtube.com/feeds/api/videos', {
      params : {
        q: query + ' -みた -コピ -カラオケ -ピアノ',
        'max-results' : 2,
        format : 5,
        alt : 'json-in-script',
        callback : 'JSON_CALLBACK'
      }
    }).success(function(data){
      if(data.feed.entry) {
        data.feed.entry.sort(function(a,b){
          return b['favoriteCount'] - a['favoriteCount'];
        });
        var permalink = data.feed.entry[0]['id']['$t'];
        var id = permalink.match(/^.+\/(.+?)$/)[1];
        if(that.ready) {
          that.player.clearVideo();
          that.player.loadVideoById(id);
        }else{
          that.player = new YT.Player('player', {
            height: '400',
            width: '600',
            videoId : id,
            playerVars: { 'autoplay': 1, 'rel': 0 },
            events : {
              onStateChange : function (event){
                if(event.data == YT.PlayerState.ENDED ) {
                  callback();
                }
              }
            }
          });
        }
      }else{
        callback();
      }
      that.ready = true;
    }).error(function(error){
      callback();
    });
  };
})
.service('PlayList', function(){
  this.list = [];
  this.index = 0;
  this.ready = false;

  this.add = function(track){
    this.list.push(track);
  };

  this.current_track = function(){
    if (!this.ready) return;
    return this.list[this.index];
  };

  this.set_songs = function(songs) {
    this.list = songs;
  };

  this.next = function(index){
    if(index || typeof index != 'undefined') {
      this.index = index;
    }else if(!this.ready) {
      this.index = 0;
    }else{
      if(this.index + 1 >= this.list.length ) {
        this.index = 0
      }else{
        this.index++;
      }
    }
    this.ready = true;
    return this.list[this.index];
  };

  this.clear = function(){
    this.list = [];
    this.ready = false;
  };

  this.hasImage = function(index) {
    return this.list[index].medium_image.length > 0;
  };
})
.controller('MainCtrl', function ($scope, $http, YouTube, PlayList) {

  var url = 'http://nagaretetter-server.herokuapp.com/songs.json';

  $scope.songs = [];
  $scope.nextPage = 1;

  $scope.loadMore = function() {
    $http.get(url, {params: {page: $scope.nextPage }}).
      success(function(data) {
      if ($scope.nextPage === parseInt(data.page) + 1) {
        return;
      }
      $scope.songs = $scope.songs.concat(data.songs);
      PlayList.set_songs($scope.songs);
      $scope.nextPage = parseInt(data.page) + 1;
    }).
      error(function() {
      console.log('error');
    });
  };

  $scope.play = function(index) {
    YouTube.play(PlayList.next(index), $scope.play);
  };

  $scope.isActive = function(index) {
    return (PlayList.ready && PlayList.index === index);
  };

  $scope.hasImage = function(index) {
    return PlayList.hasImage(index);
  };

  $scope.songImage = function(index) {
    var imageUrl = $scope.songs[index].medium_image;
    if(imageUrl.length === 0) {
      return 'images/yeoman.png';
    }
    return imageUrl;
  }

  $scope.loadMore();
})
.directive('whenScrolled',  function($window) {
    return function(scope, elem, attr) {
        var raw = elem[elem.length - 1];
        angular.element($window).bind('scroll', function() {
            if (raw.offsetTop + raw.offsetHeight < document.documentElement.scrollTop + window.innerHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
