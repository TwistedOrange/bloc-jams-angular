(function() {
  function Fixtures() {

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
      year: '1972-1978',
      albumArtUrl: '/assets/images/album_covers/70s-cover.jpg',
      songs: [
        { title: 'Green Acres', duration: 63.56, audioUrl: '/assets/music/grnacres' },
        { title: 'Taxi', duration: 63.32, audioUrl: '/assets/music/taxi' },
        { title: 'Cheers', duration: 62.56, audioUrl: '/assets/music/cheers' },
        { title: "Gilligan's Island", duration: 90.91, audioUrl: '/assets/music/gilligan' },
        { title: 'Batman', duration: 43.27, audioUrl: '/assets/music/batman' },
        { title: 'Flintstones', duration: 82.86, audioUrl: '/assets/music/flintstones' },
        //{ title: 'I Dream of Jeannie', duration: 46.79, audioUrl: '/assets/music/jeannie' }
      ]
    };

    // methods and properties related to album data
    var getAlbum = function() {
      return album70Themes;
    };

    var getCollection = function(numberOfAlbums) {
      var collection = [];

      for (var x=0; x<numberOfAlbums; x++) {
        collection.push(getAlbum());
      }

      return collection;
    };

    // expose these methods and properties
    var Fixture_API = {
      getAlbum: getAlbum,
      getCollection: getCollection
    }

    return Fixture_API;
  }

  angular
    .module('blocJams')
    // register a service of type 'factory' named Fixtures
    .factory('Fixtures', Fixtures);
})();
