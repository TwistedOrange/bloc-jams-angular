(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
  }

  angular
    .module('blocJams')
    // inject service Fixtures as a dependency to access its data
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl] );
})();
