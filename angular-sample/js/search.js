angular.module('GiantBombSearch', ['ngResource']);

function SearchCtrl($scope, $resource) {
  $scope.searchText = "";
  $scope.apikey = localStorage.getItem('apikey');

//define search ngResource
  $scope.search = $resource('http://www.giantbomb.com/:action',
      {action: 'api/games', api_key: 'e316aff9ff7d945077dabd3a13ecebaad12bb70d', format: 'jsonp', field_list: 'name,id', filter: 'name:...', json_callback: 'JSON_CALLBACK'},
      {get: {method: 'JSONP'}});  

  //define btn handler
  $scope.performSearch = function(){
    $scope.searchResults = $scope.search.get({filter: 'name:' + $scope.searchText, api_key: localStorage.getItem('apikey')});
  }
  
  $scope.storeApiKey =  function(){
    localStorage.setItem('apikey', $scope.apikey);
  }
 
  
}