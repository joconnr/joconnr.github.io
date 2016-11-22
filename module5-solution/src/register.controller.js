(function () {
'use strict';

angular.module('public')
.controller('RegisterController', RegisterController);


RegisterController.$inject = ['$q', '$http', 'InfoService', '$stateParams'];
function RegisterController($q, $http, InfoService, $stateParams) {
  var list = this;
  list.notCompleted = true;
  
	list.first = InfoService.getFirst();
	list.last = InfoService.getLast();
	list.email = InfoService.getEmail();
	list.phone = InfoService.getPhone();	
	list.itemTitle = InfoService.getItemTitle();
	list.itemDescription = InfoService.getItemDescription();	
	list.itemShortname = InfoService.getItemShortname();	
	list.itemShortnameLetter = InfoService.getItemShortnameLetter();	
	
	if (list.first != null && list.first.trim() != '') {
		list.notCompleted = false;
	}

	list.regCompleted = function () {
	  return list.notCompleted;
	};
}

})();