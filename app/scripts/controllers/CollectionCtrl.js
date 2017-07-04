(function() {
  function CollectionCtrl(Fixtures) {
    //this.albums = [];
    //  for (var i=0; i < 12; i++) {
    //    this.albums.push(angular.copy(album70Themes));
    //  }
    this.albums = Fixtures.getCollection(5);
  }

  angular
    .module('blocJams')
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl] );
})();
