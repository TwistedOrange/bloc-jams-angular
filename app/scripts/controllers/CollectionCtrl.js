(function() {
  // make service Fixtures available to (dependency injection)
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(12);

    //  for (var i=0; i < 12; i++) {
    //    this.albums.push(angular.copy(album70Themes));
    //  }
  }

  angular
    .module('blocJams')
    // add service recipe Fixtures as a dependency to access its data
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl] );
    //.factory('Fixtures', Fixtures);   // DELETED - is redundant
})();
