(function() {
  /**
   * SongPlayer service manages playing, pausing a song, and tracks its state
   * @constructor
   */
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer_API = {};

    // make album visible to player bar
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @function getSongIndex() - Private
     * @desc - Return position of currently active song in album/song object.
     * Player bar only needs to know one song, not all songs.
     * @param {Object} song - currently active song
     */
    var getSongIndex = function(song ) {
      return currentAlbum.songs.indexOf(song);
    };


    /**
     * @desc Buzz object audio file for current song
     * @type {Object} - Private
     */
     SongPlayer_API.currentBuzzObject = null;

     /**
      * @desc Holds status of current song (null, paused, playing, hovered)
      * @type {Object} - Public
      */
     SongPlayer_API.currentSong = null;

     SongPlayer_API.volume = 45;      // initial value, same as CSS


    /**
    * @function setCurrentTime() - Public
    * @desc Set current time of currently playing song
    * @param {Number} time in seconds
    */
    SongPlayer_API.setCurrentTime = function(time) {
      //console.log('SongPlayer_API.setCurrentTime =', time);
      if (currentBuzzObject) {
      SongPlayer_API.currentBuzzObject.setTime(time);
      }
    };

    /**
    * @function setVolume() - Public
    * @desc Set volume according to seek bar adjustment
    * @param {Number} volume level (0-100)
    */
    SongPlayer_API.setVolume = function(vol) {
      //console.log('SongPlayer_API.setVolume =', vol);
      if (currentBuzzObject) {
        SongPlayer_API.volume = vol;
        SongPlayer_API.currentBuzzObject.setVolume(vol);
      }
    };


    /**
     * @function play() - Public
     * @desc Plays selected song, and set its playing state which
     * impacts how it's displayed to the user
     * @param  {Object} song - one song in array of album object
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
        if ( SongPlayer_API.currentBuzzObject.isPaused() ) {
          playSong(song);
        }
      }
    };

    /**
     * @function pause() - Public
     * @desc Pauses current song, and set its playing state to false which
     * impacts how it's displayed to the user
     * @param  {Object} song [one song in album object array]
     */
    SongPlayer_API.pause = function(song) {
      // option 1 used when call from Album's song rows,
      // option 2 used when call from player bar
      song = song || SongPlayer_API.currentSong;
      SongPlayer_API.currentBuzzObject.pause();
      song.playing = false;
    };


    /**
     * @function previous() - Public
     * @desc Starts playing song located previous to currently active song. Wraps to last song in album if on first song
     * @param {Object} song [one song in album object array]
     */
    SongPlayer_API.previous = function(song) {
      var currentSongIndex = getSongIndex(SongPlayer_API.currentSong);
      currentSongIndex--;

      if ( currentSongIndex < 0 ) {
        currentSongIndex = currentAlbum.songs.length - 1;
      }
      // play song previous in list to last selected song
      song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };


    /**
     * @function previous_bloc() - Public ---- BLOC version
     * @desc Starts playing song located previous to currently active song. Does not wrap to last song if at first song.
     * @param {Object} song [one song in album object array]
     */
    SongPlayer_API.previous_bloc = function(song) {
      var currentSongIndex = getSongIndex(SongPlayer_API.currentSong);
      currentSongIndex--;

      if ( currentSongIndex < 0) {
        stopSong();
      } else {
        song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
     * @function next() - Public
     * @desc Starts playing song located after currently active song,
     * if at last song, wraps to first song in album
     * @param {Object} song [one song in album object array]
     */
    SongPlayer_API.next = function(song) {
      var currentSongIndex = getSongIndex(SongPlayer_API.currentSong);
      currentSongIndex++;

      if ( currentSongIndex >= currentAlbum.songs.length) {
        // at last song, wrap to first song
        currentSongIndex = 0;
      }
      // play song previous in list to active selected song
      song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };


    /**
     * @function next_bloc() - Public ---- BLOC version
     * @desc Starts playing song located after currently active song
     * @param {Object} song [one song in album object array]
     */
    SongPlayer_API.next_bloc = function(song) {
      var currentSongIndex = getSongIndex(SongPlayer_API.currentSong);
      currentSongIndex++;

      if ( currentSongIndex >= currentAlbum.songs.length) {
        stopSong();
      } else {
        song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
     * @function playSong() - Private
     * @desc plays current Buzz object, sets playing property to true
     * @param  {Object} song [one song in album object array]
     */
    var playSong = function(song) {
      SongPlayer_API.currentBuzzObject.play();
      song.playing = true;
    };


    /**
    * @function setSong() - Private
    * @desc Stops currently playing song, re-inits playing status, & loads
    * newly selected song so it can be played.
    * @param {Object} song [one song in album object array]
    */
    var setSong = function(song) {
      if ( SongPlayer_API.currentBuzzObject ) {
        SongPlayer_API.currentBuzzObject.stop();
        SongPlayer_API.currentSong.playing = null;
      }

      SongPlayer_API.currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      // create custom event listener all parts of App can see bound
      //   to BuzzObject's timeupdate event.
      SongPlayer_API.currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer_API.currentTime = SongPlayer_API.currentBuzzObject.getTime();
        });
      });

      SongPlayer_API.currentSong = song;
    };

    /**
     * @function stopSong() - Private
     * @desc Stops active song from playing, and resets playing
     * status to null (no songs playing)
     * @param {Object} song [one song in album object array]
     */
    var stopSong = function(song) {
      SongPlayer_API.currentBuzzObject.stop();
      SongPlayer_API.currentSong.playing = null;
    };

    // expose public methods and properties
    return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer] );
 })();
