"use strict";angular.module("nagaretetter",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("nagaretetter").run(function(){var a=document.createElement("script");a.src="http://www.youtube.com/iframe_api";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b),$("a[href=#about]").popover().on("click",function(a){a.preventDefault()})}).service("YouTube",["$window","$http",function(a,b){this.ready=!1,this.player=null,this.play=function(a,c){var d=this,e=a.title+" "+a.artist;b.jsonp("http://gdata.youtube.com/feeds/api/videos",{params:{q:e+" -みた -コピ -カラオケ -ピアノ","max-results":2,format:5,alt:"json-in-script",callback:"JSON_CALLBACK"}}).success(function(a){if(a.feed.entry){a.feed.entry.sort(function(a,b){return b.favoriteCount-a.favoriteCount});var b=a.feed.entry[0].id.$t,e=b.match(/^.+\/(.+?)$/)[1];d.ready?(d.player.clearVideo(),d.player.loadVideoById(e)):d.player=new YT.Player("player",{height:"400",width:"600",videoId:e,playerVars:{autoplay:1,rel:0},events:{onStateChange:function(a){a.data==YT.PlayerState.ENDED&&c()}}})}else c();d.ready=!0}).error(function(){c()})}}]).service("PlayList",function(){this.list=[],this.index=0,this.ready=!1,this.add=function(a){this.list.push(a)},this.current_track=function(){return this.ready?this.list[this.index]:void 0},this.set_songs=function(a){this.list=a},this.next=function(a){return a||"undefined"!=typeof a?this.index=a:this.ready?this.index+1>=this.list.length?this.index=0:this.index++:this.index=0,this.ready=!0,this.list[this.index]},this.clear=function(){this.list=[],this.ready=!1},this.hasImage=function(a){return this.list[a].medium_image.length>0}}).controller("MainCtrl",["$scope","$http","YouTube","PlayList",function(a,b,c,d){var e="http://nagaretetter-server.herokuapp.com/songs.json";a.songs=[],a.nextPage=1,a.loadMore=function(){b.get(e,{params:{page:a.nextPage}}).success(function(b){a.nextPage!==parseInt(b.page)+1&&(a.songs=a.songs.concat(b.songs),d.set_songs(a.songs),a.nextPage=parseInt(b.page)+1)}).error(function(){console.log("error")})},a.play=function(b){c.play(d.next(b),a.play)},a.isActive=function(a){return d.ready&&d.index===a},a.hasImage=function(a){return d.hasImage(a)},a.songImage=function(b){var c=a.songs[b].medium_image;return 0===c.length?"images/yeoman.png":c},c.ready=!1,a.loadMore()}]).directive("whenScrolled",["$window",function(a){return function(b,c,d){var e=c[c.length-1];angular.element(a).bind("scroll",function(){e.offsetTop+e.offsetHeight<document.documentElement.scrollTop+window.innerHeight&&b.$apply(d.whenScrolled)})}}]).directive("twitter",[function(){return{link:function(a,b,c){setTimeout(function(){twttr.widgets.createShareButton(c.url,b[0],function(){},{count:"none",text:c.text,hashtags:c.hashtags})})}}}]);