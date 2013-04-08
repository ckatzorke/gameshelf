var GiantBombList = angular.module('GiantBombList', ['ngSanitize', 'ngGiantBomb']);

GiantBombList.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ListCtrl'
      })
      .when('/details/:id',{
        templateUrl: 'details.html',
        controller: 'DetailCtrl',
        resolve: {
          detail: DetailCtrl.loadDetails
        }
      })
      .otherwise({
          template: "Not found"
      });


});

GiantBombList.factory('Collection', function(){
  var Collection = {};
  Collection = {
    games:[
      {
        id: 38043,
        title: "God of War Ascension",
        platform: "PS3"
      },
      {
        id: 32933,
        title: "Far Cry 3",
        platform: "PS3"
      },
      {
        id: 36273,
        title: "Persona 4",
        platform: "PSV"
      },
      {
        id: 31757,
        title: "Starfox 64",
        platform: "3DS"
      }
    ]
  };
  return Collection;
});


GiantBombList.directive('gb', function(){
  return {
    restrict: 'E',
    template: '<span>GiantBomb!!</span>'
  }
});

GiantBombList.filter('highlightText', function(){
  return function(text, search){
    var re = new RegExp(search, 'gi');
    return text.replace(re, '<strong>$&</strong>');
  }
});

GiantBombList.controller('ApiKeyCtrl', function ($scope, $giantbomb) {
  $scope.apikey = localStorage.getItem('apikey');
  $giantbomb.setAPIKey($scope.apikey);
  $scope.storeApiKey =  function(){
    localStorage.setItem('apikey', $scope.apikey);
    $giantbomb.setAPIKey($scope.apikey);
  };
});

GiantBombList.controller('ListCtrl', function ($scope, $route, $location, Collection) {
  $scope.collection = Collection;
  $scope.loadingDetails= false;
  $scope.showDetails = function(id){
    $scope.loadingDetails = true;
    console.log("Showing details " + id);
    $location.path("/details/"+ id);
  }
});

var DetailCtrl = GiantBombList.controller('DetailCtrl', function ($scope, detail) {
  console.log("Current detail: ", detail);
  $scope.game = detail;
});
DetailCtrl.loadDetails = function($q, $route, $giantbomb){
  var defer = $q.defer();
  $giantbomb.gameDetails($route.current.params.id, function(result){
    defer.resolve(result.results);
  });
  return defer.promise;
}