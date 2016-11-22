(function () {
'use strict';

angular.module('public')
.controller('InfoController', InfoController);


InfoController.$inject = ['$q', '$http', 'InfoService', '$stateParams'];
function InfoController($q, $http, InfoService, $stateParams) {
  var list = this;
  list.completed = false;
  list.noResults = false;
  
  list.submit = function () {
	  list.completed = true;
	  list.storeMyInfo(list.first, list.last, list.email, list.phone, list.itemShortname);  
  };
  
  list.storeMyInfo = function(first, last, email, phone, itemShortname) { 
     InfoService.storeMyInfo(first, last, email, phone, itemShortname);
	 
	 var promise = InfoService.getMenuItem($q, $http);
	 
	  promise.then(function (response) {
		list.items = response.data;
		list.itemTitle = list.items.name;
		list.itemDescription = list.items.description;
		
		InfoService.storeMyChoice(list.itemTitle, list.itemDescription, list.itemPicture);
	  })
	  .catch(function (error) {
		list.noResults = true;
		console.log("Something went terribly wrong.");
	  });
  } 

  list.itemsSent = function () {
	  return list.completed;
  };

  list.errorMsg = function () {
	  return list.noResults;
  };
  
}

})();
