(function() {
  function AlbumCtrl(Fixtures) {
    this.albums = Fixtures.getAlbum();
  }

  angular
    .module('blocJams')
    // inject service Fixtures as a dependency to access its data
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl] );
})();
