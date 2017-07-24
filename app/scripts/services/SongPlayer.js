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
     var currentBuzzObject = null;
     var enableAutoPlay = false;

     // attempting playbook by adding songs to Buzz group object
     var songGroupBuzz = null;

     /**
      * @desc Holds status of current song (null, paused, playing, hovered)
      * @type {Object} - Public
      */
     SongPlayer_API.currentSong = null;
     SongPlayer_API.volume = 45;      // initial value, same as CSS
     SongPlayer_API.muted = false;

    /**
    * @function setCurrentTime() - Public
    * @desc Set current time of currently playing song
    * @param {Number} time in seconds
    */
    SongPlayer_API.setCurrentTime = function(time) {
      //console.log('SongPlayer_API.setCurrentTime =', time);
      if (currentBuzzObject) {
      currentBuzzObject.setTime(time);
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
        currentBuzzObject.setVolume(vol);
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
        if ( currentBuzzObject.isPaused() ) {
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
      currentBuzzObject.pause();
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
     * @function muteSong() - Public
     * @desc - toggles volume of currently playing song from on/off
     */
    SongPlayer_API.muteSong = function() {
      // currentBuzzObject.isMuted() ? currentBuzzObject.unMute() : currentBuzzObject.mute();
      //console.log('in muteSong()');
      if ( currentBuzzObject ) {
        currentBuzzObject.toggleMute();
      }
    };

    /**
     * @function updatePlayList()
     * @desc - test how adding songs to a group can be played on their own
     */
    SongPlayer_API.updatePlayList = function() {
        console.log('updatePlayList() - add song to playlist');
        var toPlay1, toPlay2, toPlay3;

        // define the playlist
        console.log(currentAlbum);
        console.log('sample song=', currentAlbum.songs[0].audioUrl);

        toPlay1 = new buzz.sound(currentAlbum.songs[0].audioUrl + '.mp3'),
        toPlay2 = new buzz.sound(currentAlbum.songs[1].audioUrl + '.mp3'),
        toPlay3 = new buzz.sound(currentAlbum.songs[2].audioUrl + '.mp3');

        songGroupBuzz = new buzz.group(toPlay1, toPlay2, toPlay3);
    };

    /**
     * @function - playSelectedSongs()
     * @desc
     */
    SongPlayer_API.playSelectedSongs = function() {
        // buzz.all().play();

        SongPlayer_API.updatePlayList();
        songGroupBuzz.loop().play();
    };


    /**
     * @function cycleSongs()
     * @desc Enables auto-play feature where at song end, next song is automatically played. User can enable/disable feature from button.
     */
    SongPlayer_API.cycleSongs = function() {
      if ( enableAutoPlay ) {
        enableAutoPlay = false;
        $('button').text('Auto Play: Off');
      } else {
        enableAutoPlay = true;
        $('button').text('Auto Play: On')
      }

      //enableAutoPlay ? enableAutoPlay = false : enableAutoPlay = true;
      console.log(' auto playback mode=', enableAutoPlay);

      // this didn't work, why?
      // var btn = document.getElementByTagName('button');
      // btn.innerText = "on or off based on enableAutoPlay flag";
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
      currentBuzzObject.play();
      song.playing = true;
    };


    /**
    * @function setSong() - Private
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

      // Track time played for current song - as time changes, callback is updated
      // Custom event using Buzz's "timeupdate" event
      // http://buzz.jaysalvat.com/documentation/events/
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer_API.currentTime = currentBuzzObject.getTime();
        });
      });

      /**
       * @desc AutoPlay - as one song ends, start the next song automatically
       * User can enable/disable using Playback button.
       * Custom event listener to Buzz's "ended" event.
       * http://buzz.jaysalvat.com/documentation/events/
       */
      currentBuzzObject.bind('ended', function() {
        $rootScope.$apply(function() {
          // console.log('song ended, curr song', SongPlayer_API.currentSong);
          if ( enableAutoPlay ){
            console.log('enable playback');
            SongPlayer_API.next(SongPlayer_API.currentSong);
          } else {
            console.log('disable playback');
          }
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
      currentBuzzObject.stop();
      SongPlayer_API.currentSong.playing = null;
    };

    // expose public methods and properties
    return SongPlayer_API;
  }

   angular
     .module('blocJams')
     .factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer] );
 })();
