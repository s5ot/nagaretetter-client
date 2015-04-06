'use strict';

/**
 * @ngdoc service
 * @name nagaretetter.PlayList
 * @description
 * # PlayList
 * Service in the nagaretetter.
 */
angular.module('nagaretetter')
.service('PlayList', function PlayList() {

  this.list = [];
  this.index = 0;
  this.ready = false;

  this.add = function(track) {
    this.list.push(track);
  };

  this.current_track = function() {
    if (!this.ready) {
      return;
    }
    return this.list[this.index];
  };

  this.set_songs = function(songs) {
    this.list = songs;
  };

  this.next = function(index) {
    if (index || typeof index != 'undefined') {
      this.index = index;
    } else if (!this.ready) {
      this.index = 0;
    } else {
      if (this.index + 1 >= this.list.length) {
        this.index = 0;
      } else {
        this.index++;
      }
    }
    this.ready = true;
    return this.list[this.index];
  };

  this.clear = function() {
    this.list = [];
    this.ready = false;
  };

  this.hasImage = function(index) {
    return this.list[index].medium_image.length > 0;
  };
});
