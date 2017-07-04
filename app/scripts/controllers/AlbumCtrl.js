(function() {
  // function AlbumCtrl($scope) {
  //   $scope.albumData = album70Themes;
  //   // this.albumData = album70Themes;
  // }
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }

  angular
    .module('blocJams')
    // inject service Fixtures as a dependency to access its data
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl] );
})();
