(function() {
  function Fixtures() {
    var Fixtures = {};

    // from original fixtures.js file
    // album definition objects, pulls album data into the application
    var albumPicasso = {
      title: 'The Colors',
      artist: 'Pablo Picasso',
      label: 'Cubism',
      year: '1881',
      albumArtUrl: '/assets/images/album_covers/01.png',
      songs: [
        { title: 'Blue', duration: '4:26', audioUrl: '/assets/music/blue' },
        { title: 'Green', duration: '3:14', audioUrl: '/assets/music/green' },
        { title: 'Red', duration: '5:01', audioUrl: '/assets/music/red' },
        { title: 'Pink', duration: '3:21', audioUrl: '/assets/music/pink' },
        { title: 'Magenta', duration: '2:15', audioUrl: '/assets/music/magenta' }
      ]
    };

    // source: http://www.barbneal.com/the-collection/tv-theme-songs/
    var album70Themes = {
      title: "Best of 70's TV",
      artist: 'Various Artists',
      label: '',
      year: '1973-1978',
      albumArtUrl: '/assets/images/album_covers/70s-cover.jpg',
      songs: [
        { title: 'Green Acres', duration: 63.56, audioUrl: '/assets/music/grnacres' },
        { title: 'Andy Griffith Show', duration: 50.22, audioUrl: '/assets/music/andgrif' },
        { title: 'Cheers', duration: 62.56, audioUrl: '/assets/music/cheers' },
        { title: "Gilligan's Island", duration: 90.91, audioUrl: '/assets/music/gilligan' },
        { title: 'Batman', duration: 43.27, audioUrl: '/assets/music/batman' },
        { title: 'Flintstones', duration: 43.27, audioUrl: '/assets/music/fstones' },
        { title: 'I Dream of Jeannie', duration: 43.27, audioUrl: '/assets/music/jeannie' }
      ]
    };

    // methods and properties related to album data
    // var getAlbum = function() {
    //   return album70Themes;
    // };
    //
    // var getCollection = function(numberOfAlbums) {
    //   var collection = [];
    //
    //   for (var x=0; x<numberOfAlbums; x++) {
    //     collection.push(Fixtures.getAlbum());
    //   }
    //   return collection;
    // };
    //
    // // expose these service methods and properties to the app
    // var Public_API = {
    //   getAlbum: getAlbum,
    //   getCollection: getCollection
    // }
    //
    // return Public_API;

    Fixtures.getAlbum = function() {
      return album70Themes;
    }
    
    return Fixtures;

  }

  angular
    .module('blocJams')
    // register a service of type 'factory' named Fixtures
    .factory('Fixtures', Fixtures);
})();
