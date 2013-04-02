var GiantBombList = angular.module('GiantBombList', []);

GiantBombList.config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ListCtrl'
      })
      .when('/details/:id',{
        templateUrl: 'details.html',
        controller: 'DetailCtrl'
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
        id: 0,
        title: "God of War",
        platform: "PS3"
      },
      {
        id: 1,
        title: "God of War Ascension",
        platform: "PS3"
      },
      {
        id: 2,
        title: "Far Cry 3",
        platform: "PS3"
      },
      {
        id: 3,
        title: "Persona 4",
        platform: "PSV"
      },
      {
        id: 4,
        title: "Disgaea 3",
        platform: "PSV"
      },
      {
        id: 5,
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

GiantBombList.controller('ApiKeyCtrl', function ($scope) {
  $scope.apikey = localStorage.getItem('apikey');

  $scope.storeApiKey =  function(){
    localStorage.setItem('apikey', $scope.apikey);
  };
});

GiantBombList.controller('ListCtrl', function ($scope, $route, $location, Collection) {
  $scope.collection = Collection;
  $scope.showDetails = function(id){
    console.log("Showing details " + id);
    $location.path("/details/"+ id);
  }
});
GiantBombList.controller('DetailCtrl', function ($scope, $routeParams, Collection) {
  $scope.collection = Collection;
  $scope.detail = $scope.collection.games[$routeParams.id];
  console.log("Current detail: "+$scope.detail);
});
