var app = angular.module("ShoppingListCheckOff", []);

'use strict';	
app.factory('ShoppingListFactory', ShoppingListFactory);

app.controller('ToBuyController', ToBuyController);
	
ToBuyController.$inject = ['ShoppingListFactory'];	
function ToBuyController (ShoppingListFactory) {
	var list1 = this;
	
	var shoppingList = ShoppingListFactory();
	list1.items = shoppingList.getItemsToBuy();
	
	list1.removeFromList = function(index) {
		shoppingList.removeFromList(index);
	}
	
	list1.itemsEmpty = function() {
		return list1.items.length == 0;
	}	
}
	
app.controller('AlreadyBoughtController', AlreadyBoughtController);
	
AlreadyBoughtController.$inject = ['ShoppingListFactory'];
function AlreadyBoughtController (ShoppingListFactory) {
	var list2 = this;
	
	var shoppingList = ShoppingListFactory();
	list2.items = shoppingList.getItemsBought();
	
	list2.addToList = function(index, itemName, quantity) {
		shoppingList.addToList(index, itemName, quantity);
	}

	list2.itemsEmpty = function() {
		return list2.items.length == 0;
	}	
}


function ShoppingListService ($scope) {
	var service = this;
	
	var toBuyList = [{"name" : "Milk", "quantity" : "2"}, {"name" : "Bread", "quantity" : "1"}, {"name" : "Ham", "quantity" : "1"}];
	var alreadyBoughtList = [];
	
	service.addToList = function(itemName, quantity) {
		var newItem = {
			name: itemName,
			quantity: quantity
		};	
		alreadyBoughtList.push(newItem);
	};
	
	service.removeFromList = function(index) {
		toBuyList.splice(index, 1);
	};

	service.getItemsToBuy = function() {
		return toBuyList;
	};

	service.getItemsBought = function () {
		return alreadyBoughtList;
	};
}

function ShoppingListFactory() {
  var factory = function () {
    return new ShoppingListService();
  };

  return factory;
}

