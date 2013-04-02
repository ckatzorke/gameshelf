var GiantBombSearch = angular.module('GiantBombSearch', ['ngResource', 'ngSanitize'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/search',
    controller: SearchCtrl
  });
  $routeProvider.when('/search/:searchText', {
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

function SearchCtrl($scope, $resource) {
  $scope.searchText = "";
  $scope.apikey = localStorage.getItem('apikey');
  $scope.searching = false;

//define search ngResource
  $scope.search = $resource('http://www.giantbomb.com/:action',
      {action: 'api/games', api_key: 'e316aff9ff7d945077dabd3a13ecebaad12bb70d', format: 'jsonp', field_list: 'name,id,original_release_date,platforms,api_detail_url,site_detail_url', filter: 'name:...', json_callback: 'JSON_CALLBACK'},
      {get: {method: 'JSONP'}});  

  //define btn handler
  $scope.performSearch = function(){
    $scope.searching = true;
    $scope.search.get({filter: 'name:' + $scope.searchText, api_key: localStorage.getItem('apikey')}, function(result){
      $scope.searchResults = result;
      $scope.searching = false;
    });
  };
  
  $scope.storeApiKey =  function(){
    localStorage.setItem('apikey', $scope.apikey);
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