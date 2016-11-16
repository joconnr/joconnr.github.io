(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/home',
      //templateUrl: 'src/home.html'
	  template: '<div>Welcome to our Restaurant</div>'
    })
    .state('categories', {
      url: '/categories',
      //templateUrl: 'src/categories.html'
	  template: '<h2>Categories</h2><categories items="mainList.items"></categories><ui-view></ui-view>',
	  controller: 'MenuDataController as mainList',
	  resolve: {
		  items: ['MenuDataService', function (MenuDataService) {
			  return MenuDataService.getAllCategories();
		  }]
	  }
    
	}) 
    .state('items', {
      url: '/items/{categoryShortName}',
      //templateUrl: 'src/items.html'
	  template: '<h2>Items</h2><categories items="mainList.items"></categories><ui-view></ui-view>',
	  controller: 'MenuDataItemsController as mainList',
      resolve: {
			items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
			 var categoryShortName = $stateParams.categoryShortName;
              return MenuDataService.getItemsForCategory(categoryShortName)
                .then(function (items) {
                  return items;  
                });
            }]
	  }
	});
}


})();
