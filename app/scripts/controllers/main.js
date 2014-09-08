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
  $scope.songs = [];
  $scope.nextPage = 1;
  $rootScope.targetUrl = '#analysis';
  $rootScope.targetLinkName = 'Analysis';

  $scope.loadMore = function() {
    $scope.loading = true;
    Songs.query({page: $scope.nextPage}).$promise
    .then(function(data) {
      if ($scope.nextPage === parseInt(data.page, 10) + 1) {
        return;
      }
      $scope.songs = $scope.songs.concat(data.songs);
      PlayList.set_songs($scope.songs);
      $scope.nextPage = parseInt(data.page, 10) + 1;
      $scope.loading = false;
    },
    function() {
      console.log('error');
      $scope.loading = false;
    });
  };

  $scope.isLoading = function() {
    return $scope.loading;
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
    if (imageUrl.length === 0) {
      return 'images/yeoman.png';
    }
    return imageUrl;
  };

  YouTube.ready = false;
  $scope.loadMore();
}]);
