(function() {
  /**
   * SongPlayer service manages playing, pausing a song, and tracks its state
   * @constructor
   */
  function SongPlayer() {
    var SongPlayer_API = {};

    /**
     * @desc Holds status of current song (null, paused, playing, hovered)
     * @type {Object} - Public
     */
    // var currentSong = null;
    SongPlayer_API.currentSong = null;

    /**
     * @desc Buzz object audio file for current song
     * @type {Object} - Private
     */
     var currentBuzzObject = null;

    /**
     * @function play (public)
     * @desc Plays selected song, and set its playing state to false which
     * impacts how it's displayed to the user
     * @param  {Object} song [one song in array of album object]
     */
     SongPlayer_API.play = function(song) {
      // option 1 used when call from Album's song rows,
      // option 2 used when call from player bar
      song = song || SongPlayer_API.currentSong;

      // test if a selected song is the one now playing
      if ( SongPlayer_API.currentSong !== song ) {
          setSong(song);
          playSong(song);
      } else if ( SongPlayer_API.currentSong === song ) {
        // yes, selected song is chosen, if it's paused, play it
        if ( currentBuzzObject.isPaused() ) {
          playSong(song);
        }
      }
    };

    /**
     * @function pause (public)
     * @desc Pauses current song, and set its playing state to false which
     * impacts how it's displayed to the user
     * @param  {Object} song [one song in album object array]
     */
    SongPlayer_API.pause = function(song) {
      // option 1 used when call from Album's song rows,
      // option 2 used when call from player bar
      song = song || SongPlayer_API.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function playSong (private)
     * @desc plays current Buzz object, sets playing property to true
     * @param  {Object} song [one song in album object array]
     */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };


    /**
    * @function setSong (private)
    * @desc Stops currently playing song, re-inits playing status, & loads
    * newly selected song so it can be played.
    * @param {Object} song [one song in album object array]
    */
    var setSong = function(song) {
      if ( currentBuzzObject ) {
        currentBuzzObject.stop();
        SongPlayer_API.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer_API.currentSong = song;
    };

    // expose methods and properties
    return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
