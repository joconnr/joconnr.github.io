(function () {
'use strict';

angular.module('MenuApp')
.component('itemDetail', {
  //templateUrl: 'items.template.html',
  template: '<ul><li ng-repeat="item in $ctrl.items" >{{ item.name }}</li> </ul>',
  bindings: {
    items: '<'
  }
});

})();
