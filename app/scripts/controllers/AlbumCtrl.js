(function() {
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }

  // function AlbumCtrl($scope) {    // from ckpt5-assignment - working
  //   $scope.albumData = album70Themes;
  //   // this.albumData = album70Themes;
  // }

  angular
    .module('blocJams')
    // inject service Fixtures as a dependency to access its data
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl] );
})();
