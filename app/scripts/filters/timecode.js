(function() {

  // Filter functions must return another function which takes at least
  // one argument, the input of the filter
  function timecode(SongPlayer) {
    return function(seconds) {
      var seconds = Number.parseFloat(seconds);

      // on page load, no Buzz object seleted so no time to display
      if ( Number.isNaN(seconds) ) {
        return '-:--';
      }

      /*
      * Using Buzz library toTimer(seconds)
       */
      //return SongPlayer_API.currentBuzzObject.toTimer(seconds);

      var wholeSeconds = Math.floor(seconds);
      var minutes = Math.floor(wholeSeconds / 60);
      var remainingSeconds = wholeSeconds % 60;

      var output = minutes + ':';

      if (remainingSeconds < 10) {
        output += '0';
      }
      output += remainingSeconds;

      return output;
    };
  }

  angular
    .module('blocJams')
    //.factory('SongPlayer', SongPlayer)
    .filter('timecode', timecode);

})();
