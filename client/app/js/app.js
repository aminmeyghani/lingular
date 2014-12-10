angular.module("app", ["ngRoute", "infinite-scroll"])
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

.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) {return;}
    this.busy = true;

    var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    $http.jsonp(url).success(function(data) {
      var items = data.data.children;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
})

// .controller("BooksScrollCtrl", function($scope, books) {
//   $scope.books = books.data;

// })

.controller("BooksController", function($scope, books) {
  $scope.books = books.data;
  $scope.myBooks = [];
  $scope.nextPage = function() {
    // Empty?
  }
  $scope.something = "random string";
  $scope.users = [{ name: "Amin Meyghani", profession: "Developer" }, { name: "Shane Boland", profession: "Not a Developer haha"}];
})

// .controller('DemoController', function($scope) {
//   $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

//   $scope.loadMore = function() {
//     var last = $scope.images[$scope.images.length - 1];
//     for(var i = 1; i <= 8; i++) {
//       $scope.images.push(last + i);
//     }
//   };
// })

.controller('DemoControllerSecond', function($scope, Reddit) {
  $scope.reddit = new Reddit();
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
