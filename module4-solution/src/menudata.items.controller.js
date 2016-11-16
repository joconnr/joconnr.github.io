(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuDataItemsController', MenuDataItemsController);


MenuDataItemsController.$inject = ['$q', '$http', 'MenuDataService', '$stateParams', 'items'];
function MenuDataItemsController($q, $http, MenuDataService, $stateParams, items) {
  var list = this;
  list.items = items.data.menu_items;
}

})();