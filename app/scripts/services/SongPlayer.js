(function() {
  function SongPlayer() {
    var play = function(song) {
      var currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
console.log('in SongPlayer constructor, before play()');
      currentBuzzObject.play();
    };

    // expose methods and properties
    var SongPlayer_API = {
      play: play
    };

    return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
