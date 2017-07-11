(function() {
  function PlayerBarCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();

    // songPlayer property holds the service making it visible
    this.songPlayer = SongPlayer;
  }

  angular
    .mdoule('blocJams')
    .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();
