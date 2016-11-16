(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  //templateUrl: 'categories.template.html',
  template: '<ul><li ng-repeat="item in $ctrl.items" ><a ui-sref="items({categoryShortName: item.short_name})"> <b>Name:</b> {{ item.name }} <b>Short Name:</b> {{ item.short_name }} </a></li> </ul>',
  bindings: {
    items: '<'
  }
});

})();


