(function() {
  function SongPlayer() {
    var currentSong = null;
    var currentBuzzObject = null;

    var play = function(song) {
      // test if a selected song is the one now playing
      if ( currentSong !== song ) {
        // 1. Stop the currently playing song, if there is one
        // 2. Set a new Buzz sound object
        // 3. Set the newly chosen song object as the currentSong
        // 4. Play the new Buzz sound object

        // user chose diff song, stop this one from playing
        if ( currentBuzzObject ) {
          currentBuzzObject.stop();
        }
      } else if ( currentSong === song ) {
        // yes, selected song is chosen, it must be paused, so play it
        if ( currentBuzzObject.isPaused() ) {
          currentBuzzObject.play();
        }
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
console.log('in SongPlayer constructor, before play()');
      currentSong = song;   // switch songs
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
