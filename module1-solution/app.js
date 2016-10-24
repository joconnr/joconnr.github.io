var app = angular.module("LunchCheck", []);

'use strict';	
app.controller('LunchCheckController', LunchCheckController);
	
LunchCheckController.$inject = ['$scope'];	
function LunchCheckController ($scope) {

$scope.response = "";
$scope.entries = "";

$scope.checkIfTooMuch = function() {
	var count = 0;
	$scope.response = "Please enter data first";
	
	if($scope.entries.trim().length > 0){
		count = $scope.entries.split(',').length; 
	}
	
	if(count > 3){
		$scope.response = "Too Much";
	}	
	else if(count >= 1 && count > 0){
		$scope.response = "Enjoy!";
	}
	
	return $scope.response;
}
	
}
	
 