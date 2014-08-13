'use strict';

/**
 * @ngdoc service
 * @name nagaretetter.Songs
 * @description
 * # Songs
 * Factory in the nagaretetter.
 */
angular.module('nagaretetter')
.factory('Songs', ['$resource', function ($resource) {
  return $resource('http://nagaretetter-server.herokuapp.com/songs.json',
    {page: 'nextPage'},
    {'query': {method:'GET', isArray:false}});
}]);
