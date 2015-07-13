(function (angular){
	'use strict';
	var app=angular.module('brainmusic.controllers');
	app.controller('MenuCtrl',["$scope","$state","ionicMaterialInk","ionicMaterialMotion","$timeout","$localStorage",function($scope,$state,ionicMaterialInk,ionicMaterialMotion,$timeout,$localStorage){
	$timeout(function(){
		ionicMaterialInk.displayEffect();
	},0);
		$scope.logout=function()
		{
			delete $localStorage.userData;
			delete $localStorage.logged;
			$state.go('login');
		};
	}]);
})(window.angular);
