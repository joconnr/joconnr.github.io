 (function () { 
 'use strict'; 
 

 angular.module('public') 
 .service('InfoService', InfoService); 
 
 
 InfoService.$inject = ['$q', '$http', '$stateParams']   
 function InfoService($q, $http, $stateParams) { 
   var service = this; 
  
	service.first = "Test";
	service.last = "User";
	service.email = "My@Yahoo.com";
	service.phone = "555-1212";	
	service.itemTitle = "Egg Foo Young";	
	service.itemDescription = "great stuff";	
 
    service.storeMyInfo = function(first, last, email, phone, itemShortname) { 
		service.first = first;
		service.last = last;
		service.email = email;
		service.phone = phone;
		service.itemShortname = itemShortname;	
	} 

	service.storeMyChoice = function(itemTitle, itemDescription, itemPic) { 
		service.itemTitle = itemTitle;
		service.itemDescription = itemDescription;
		service.itemPic = itemPic;
	} 

	service.getMenuItem = function () {
		var response = $http({
			method: "GET",	
			url: ("https://arcane-peak-57989.herokuapp.com/menu_items/" + service.itemShortname + ".json")
		});
		return response;
	};
  
	service.getFirst = function() { 
		return service.first;
	} 
	
	service.getLast = function() { 
		return service.last;
	} 
	
	service.getEmail = function() { 
		return service.email;
	} 
	
	service.getPhone = function() { 
		return service.phone;
	} 

	service.getItemTitle = function() { 
		return service.itemTitle;
	} 
	
	service.getItemDescription = function() { 
		return service.itemDescription;
	}

	service.getItemPicture = function() { 
		return service.itemPic;
	} 	
	
 } 
  
 })(); 
