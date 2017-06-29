(function() {
  function AlbumCtrl($scope) {
    $scope.albumData = album70Themes;
    // this.albumData = album70Themes;
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
