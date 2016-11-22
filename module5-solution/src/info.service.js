 (function () { 
 'use strict'; 
 

 angular.module('public') 
 .service('InfoService', InfoService); 
 
 
 InfoService.$inject = ['$q', '$http', '$stateParams']   
 function InfoService($q, $http, $stateParams) { 
   var service = this; 
  
	service.first = "";
	service.last = "";
	service.email = "";
	service.phone = "";	
	service.itemTitle = "";	
	service.itemDescription = "";	
 
    service.storeMyInfo = function(first, last, email, phone, itemShortname) { 
		service.first = first;
		service.last = last;
		service.email = email;
		service.phone = phone;
		if(itemShortname != 'undefined') {
			service.itemShortname = itemShortname.toUpperCase();		
			var regexStr = service.itemShortname.match(/[A-Za-z]/);
			service.itemShortnameLetter = regexStr[0];
		}
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

	service.getItemShortname = function() { 
		return service.itemShortname;
	} 	
	
	service.getItemShortnameLetter = function() { 
		return service.itemShortnameLetter;
	} 		
 } 
  
 })(); 
