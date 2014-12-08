angular.module("app", ["ngRoute"])
.controller("MainCtrl", function($scope) {
	$scope.mainData = "This is the main data ...";
})
.factory("BookService", function($http) {
  return {
    get: function() {
      return $http.get('/books');
    }
  };
})
.controller("BooksController", function($scope, books) {
	
  $scope.books = books.data;
})

.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/test', {
    templateUrl: 'views/test.html'
  });

  $routeProvider.when('/books', {
    templateUrl: 'views/books.html',
    controller: 'BooksController',
    resolve: {
      books : function(BookService) {
        return BookService.get();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/' });

})

;
