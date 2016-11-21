(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
  	.state('myinfo', { 
	  url: '/myinfo', 
	 //templateUrl: 'src/public/my-info/my-info.html' 
	  template: '<body ng-controller="InfoController as list"><h1>Sign Up</h1><fieldset><legend>Registration</legend><form name="regForm" novalidate>First Name: <input type="text" name="first" style="color:black" placeholder="Type a First Name" ng-model="list.first" value="{{ list.first }}" required><span ng-if="regForm.firstname.$invalid && regForm.firstname.$touched">Must be a valid First name: handle@domain format</span><br> Last Name: <input type="text" name="last" style="color:black" placeholder="Type a Last Name" ng-model="list.last" value="{{ list.last }}" required><span ng-if="regForm.lastname.$invalid && regForm.lastname.$touched">Must be a valid Last name: handle@domain format</span><br>Email: <input type="email" name="email" style="color:black" placeholder="Email" ng-model="list.email" value="{{ list.email }}" required><span ng-if="regForm.email.$invalid && regForm.email.$touched"> Must be a valid email address: handle@domain format</span><br>Phone: <input type="text" name="phone" style="color:black" placeholder="Phone ###-###-####" ng-model="list.phone" value="{{list.phone}}" pattern="(\d{3})-(\d{3})-(\d{4})"><span ng-if="regForm.phone.$invalid && regForm.phone.$touched">Phone must be in the format ###-###-####.</span><br>Favorite Item Short Name: <input type="text" name="itemShortname" style="color:black" placeholder="Type an Item Short Name" ng-model="list.itemShortname" value="{{ list.itemShortname }}" required><span ng-if="regForm.itemShortname.$invalid && regForm.itemShortname.$touched">Must be a valid Item Short Name: handle@domain format</span><br><button  ng-click="list.submit()">Submit</button> <div style="margin-top: 10px;"> Form valid? {{regForm.$valid }}</div><div ng-if="list.itemsSent()" class="emptyMessage"><h2>Your information has been saved</h2></div><div ng-if="list.errorMsg()" class="error"><h2>No such menu number exists</h2></div></form></fieldset></body>', 
	  controller: 'InfoController as list'
	})
  	.state('signup', { 
	  url: '/signup', 
	 //templateUrl: 'src/public/my-info/registration.html' 
	  template: '<body ng-controller="RegisterController as list"><h1>Registration</h1><fieldset><legend>Registration</legend><form name="regForm" novalidate><div ng-app="restaurant"><h1>You are Registered As:</h1><h2 ng-model="list.first">First name: {{list.first}}</h2><br/><h2 ng-model="list.last">Last name: {{list.last}}</h2><br/><h2 ng-model="list.email">Email Address: {{list.email}}</h2><br/><h2 ng-model="list.phone">Phone Number: {{list.phone}}</h2><br/><h1>Favorite Menu Item</h1><br/><h2 ng-model="list.itemTitle">Title: {{list.itemTitle}}</h2><h2 ng-model="list.itemDescription">Description: {{list.itemDescription}}</h2></div><div ng-if="list.regCompleted()" class="error"><a ui-sref="myinfo"><h2>Not Signed Up Yet. Sign up Now!</h2></a></div></form></fieldset></body>', 
	  controller: 'RegisterController as list'
	})
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
