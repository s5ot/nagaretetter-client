'use strict';
angular.module('nagaretetter')
.run(function() {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var first_tag = document.getElementsByTagName('script')[0];
  first_tag.parentNode.insertBefore(tag, first_tag);
})
.controller('MainController', ['$scope', 'Songs', 'YouTube', 'PlayList', '$rootScope', 'd3Service', function($scope, Songs, YouTube, PlayList, $rootScope, d3Service) {
  d3Service.d3();
  this.songs = [];
  this.nextPage = 1;
  $rootScope.targetUrl = 'analysis';
  $rootScope.targetLinkName = 'analysis';

  this.loadMore = function() {
    this.loading = true;
    Songs.query({page: this.nextPage}).$promise
    .then(function(data) {
      if (this.nextPage === parseInt(data.page, 10) + 1) {
        return;
      }
      console.log(this);
      this.songs = this.songs.concat(data.songs);
      PlayList.set_songs(this.songs);
      this.nextPage = parseInt(data.page, 10) + 1;
      this.loading = false;
    }.bind(this),
    function() {
      console.log('error');
      this.loading = false;
    });
  };

  this.isLoading = function() {
    return this.loading;
  };

  this.play = function(index) {
    YouTube.play(PlayList.next(index), this.play);
  };

  this.isActive = function(index) {
    return (PlayList.ready && PlayList.index === index);
  };

  this.hasImage = function(index) {
    return PlayList.hasImage(index);
  };

  this.songImage = function(index) {
    var imageUrl = this.songs[index].medium_image;
    if (imageUrl.length === 0) {
      return 'images/yeoman.png';
    }
    return imageUrl;
  };

  $scope.$on('load_more', function(event, data) {
    this.loadMore();
  }.bind(this));

  $scope.$on('main_ready', function(event, data) {
    this.loadMore();
  }.bind(this));

  $scope.$emit('main_ready', this);

  YouTube.ready = false;
}]);
