(function() {
  /**
   * SongPlayer service manages playing & pausing a song, and tracks its state
   * @constructor
   */
  function SongPlayer() {

    /**
     * @desc Holds status of current song (null, paused, playing, hovered)
     * @type {Object}
     */
    //var currentSong = null;
    SongPlayer.currentSong = null;

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

    /**
     * @function play (public)
     * @desc Plays selected song, and set its playing state to false which
     * impacts how it's displayed to the user
     * @param  {Object} song [one song in array of album object]
     */
    // var play = function(song) {
    SongPlayer.play = function(song) {
      // confirm selected song is the one now playing
      if ( SongPlayer.currentSong !== song ) {
          setSong(song);
          playSong(song);
      } else if ( SongPlayer.currentSong === song ) {
        // yes, selected song is chosen, if it's paused, play it
        if ( currentBuzzObject.isPaused() ) {
          currentBuzzObject.play();
        }
      }
    };

    /**
     * @function pause (public)
     * @desc Pauses current song, and set its playing state to false which
     * impacts how it's displayed to the user. Flag 'playing' is set in
     * template.
     * @param  {Object} song [one song in album object array]
     */
    // var pause = function(song) {
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function playSong (private)
     * @desc plays current Buzz object, sets playing property to true.
     * Flag 'playing' is set in template.
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
        song.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };


    // // expose methods and properties
    // var SongPlayer_API = {
    //   play: play,
    //   pause: pause,
    //   // make public for PlayerBarCtrl
    //   // currentSong: currentSong
    // };

    //return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
