(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();

    // songPlayer property holds the service making it visible
    this.songPlayer = SongPlayer;
  }

  angular
    .module('blocJams')
    // inject service Fixtures as a dependency to access its data
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl] );
})();
