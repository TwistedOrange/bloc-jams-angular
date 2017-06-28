(function() {
  function LandingCtrl() {

  }

  angular
    // no 2nd arg since dependencies set in app.js
    .module('blocJams')
    // arg2 = callback func or [] that injects dependencies w/ callback as last elem
    .controller('LandingCtrl', LandingCtrl);
})();
