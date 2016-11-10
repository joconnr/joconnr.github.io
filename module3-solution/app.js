(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('MenuSearchFactory', MenuSearchFactory)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    //templateUrl: 'menuList.html',
	template: '<h3>{{ list.myTitle }}</h3><ol><li ng-repeat="item in list.items">Name: {{ item.name }} ShortName: {{ item.short_name }} Description: {{ item.description }} <button ng-click="list.onRemove({index: $index});">Don`t want this one!</button></li></ol>',
    scope: {
      items: '<',
      myTitle: '@title',
      badRemove: '=',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['$q', '$http', 'MenuSearchFactory'];
function NarrowItDownController($q, $http, MenuSearchFactory) {
  var list = this;
  
  // Use factory to create new shopping list service
  var menuList = MenuSearchFactory();
  var origTitle = "Menu List #1";
  
  
  list.getMatchedMenuItems = function () {
	list.foundItems = [];

	  if (list.searchTerm != null && list.searchTerm !== 'undefined' && list.searchTerm.trim() != '') {
		  var promise = menuList.getMatchedMenuItems($q, $http);

		  promise.then(function (response) {
			list.items = response.data.menu_items;

			list.narrowMenuItems();
			list.checkItemsEmpty();
		  })
		  .catch(function (error) {
			console.log("Something went terribly wrong.");
		  });
	  } 
	  else {
		  list.title = "Nothing Found";
	  }  
  };	
  
  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    list.lastRemoved = "Last item removed was " + this.foundItems[itemIndex].description;
    list.foundItems.splice(itemIndex, 1);
    list.title = origTitle + " (" + list.foundItems.length + " items )";
  };
  
  list.narrowMenuItems = function () {
  	list.foundItems = [];

    for (var i = 0; i < list.items.length; i++) {
      var description = list.items[i].description;
      if (description.toLowerCase().indexOf(list.searchTerm) !== -1) {
         // Keep the item
		 list.foundItems.push(list.items[i]);
      }
    }

	list.title = origTitle + " (" + list.foundItems.length + " items )";	
  };
  
  list.checkItemsEmpty = function() {
	if(list.foundItems.length == 0) {
		list.title = "Nothing Found";
	}  
  }
}


// If not specified, maxItems assumed unlimited
MenuSearchService.$inject = ['$q', '$http'];
function MenuSearchService($q, $http) {
  var service = this;

  service.getMatchedMenuItems = function ($q, $http) {
    var response = $http({
		method: "GET",
		url: ("https://davids-restaurant.herokuapp.com" + "/menu_items.json")
	});
	return response;
  };

}


function MenuSearchFactory() {
  var factory = function () {
    return new MenuSearchService();
  };

  return factory;
}

})();
