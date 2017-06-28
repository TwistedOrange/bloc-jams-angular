(function() {
  function LandingCtrl() {
    // heroTitle now avail in $scope object
    this.heroTitle = "Turn the Music Up!";
  }

  angular
    // no 2nd arg since dependencies set in app.js
    .module('blocJams')
    // arg2 = callback func or [] that injects dependencies w/ callback as last elem
    .controller('LandingCtrl', LandingCtrl);
})();
