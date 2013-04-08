var GiantBombSearch = angular.module('GiantBombSearch', ['ngGiantBomb', 'ngSanitize']);

GiantBombSearch.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/search',
      controller: SearchCtrl
    })
    .when('/search/:searchText', {
      templateUrl: '/searchresult',
      controller: SearchCtrl
    });
  // configure html5 to get links working
  // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
  $locationProvider.html5Mode(true);
});

GiantBombSearch.filter('highlightText', function(){
  return function(text, search){
    var re = new RegExp(search, 'gi');
    return text.replace(re, '<strong>$&</strong>');
  }
});

GiantBombSearch.filter('displayDate', function(){
  return function(date){
    var d = new Date(date);
    return d.getMonth()+"/"+d.getDay()+"/"+(d.getYear()<1999?d.getYear()+1900:d.getYear());
  }
});

function SearchCtrl($scope, $giantbomb) {
  $scope.searchText = "";
  $scope.apikey = localStorage.getItem('apikey');
  $giantbomb.setAPIKey($scope.apikey);
  $scope.searching = false;

  //define btn handler
  $scope.performSearch = function(){
    $scope.searching = true;
    $giantbomb.gameSearch( $scope.searchText, function(result){
      $scope.searchResults = result;
      $scope.searching = false;
    });
  };
  
  $scope.storeApiKey =  function(){
    localStorage.setItem('apikey', $scope.apikey);
    $giantbomb.setAPIKey($scope.apikey);
  };

  $scope.displayPlatforms = function(platforms){
    var platformString = "";
    if(platforms){
      for (var i = platforms.length - 1; i >= 0; i--) {
        platformString += platforms[i].abbreviation + (i>0?", ":"");
      }
    }
    return platformString == "" ? "None": platformString;
  };
 
  
}