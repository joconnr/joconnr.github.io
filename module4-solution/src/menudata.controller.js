(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuDataController', MenuDataController);


MenuDataController.$inject = ['$q', '$http', '$timeout', 'MenuDataService', 'items'];
function MenuDataController($q, $http, $timeout, MenuDataService, items) {
  var mainList = this;
  mainList.items = items.data;
}

})();
