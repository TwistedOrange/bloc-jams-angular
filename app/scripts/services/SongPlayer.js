(function() {
  function SongPlayer() {
    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentSong = null;         // obj or variable?
    var currentBuzzObject = null;

    var play = function(song) {
      // test if a selected song is the one now playing
      if ( currentSong !== song ) {
          setSong(song);
          currentBuzzObject.play();
          song.playing = true;
      } else if ( currentSong === song ) {
        console.log('same song');
        // yes, selected song is chosen, if it's paused, play it
        if ( currentBuzzObject.isPaused() ) {
          currentBuzzObject.play();
        }
      }
    };

    var pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };


    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if ( currentBuzzObject ) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };


    // expose methods and properties
    var SongPlayer_API = {
      play: play,
      pause: pause
    };

    return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
