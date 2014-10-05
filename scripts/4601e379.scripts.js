"use strict";angular.module("nagaretetter",["ngCookies","ngResource","ngSanitize","ngRoute","d3"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/analysis",{templateUrl:"views/analysis.html",controller:"AnalysisController"}).otherwise({redirectTo:"/"})}]),angular.module("nagaretetter").run(function(){var a=document.createElement("script");a.src="http://www.youtube.com/iframe_api";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}).controller("MainController",["$scope","Songs","YouTube","PlayList","$rootScope","d3Service",function(a,b,c,d,e,f){f.d3(),a.songs=[],a.nextPage=1,e.targetUrl="#analysis",e.targetLinkName="Analysis",a.loadMore=function(){a.loading=!0,b.query({page:a.nextPage}).$promise.then(function(b){a.nextPage!==parseInt(b.page,10)+1&&(a.songs=a.songs.concat(b.songs),d.set_songs(a.songs),a.nextPage=parseInt(b.page,10)+1,a.loading=!1)},function(){console.log("error"),a.loading=!1})},a.isLoading=function(){return a.loading},a.play=function(b){c.play(d.next(b),a.play)},a.isActive=function(a){return d.ready&&d.index===a},a.hasImage=function(a){return d.hasImage(a)},a.songImage=function(b){var c=a.songs[b].medium_image;return 0===c.length?"images/yeoman.png":c},c.ready=!1,a.loadMore()}]),angular.module("nagaretetter").controller("AnalysisController",["$scope","$rootScope","$http",function(a,b,c){b.targetUrl="#",b.targetLinkName="Main",a.init=function(){c({method:"GET",url:"http://nagaretetter-server.herokuapp.com/songs/ranking_range.json"}).success(function(b){a.range=b.ranking_range.range})},a.init()}]);