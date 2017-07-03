(function() {
  // make service Fixtures available to controller (via dependency injection)
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(12);
  }

  angular
    .module('blocJams')
    // add service recipe Fixtures as a dependency to access its data
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl] );
    //.factory('Fixtures', Fixtures);   // DELETED - is redundant
})();
