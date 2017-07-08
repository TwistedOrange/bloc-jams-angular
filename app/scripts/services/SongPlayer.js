(function() {
  function SongPlayer() {
    var play = function(song) {
      var currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.play();
    };

    // expose these methods and properties
    var SongPlayer_API = {
      play: play
    };

    return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
