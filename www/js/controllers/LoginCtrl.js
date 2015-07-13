(function (angular){
	'use strict';
	var app=angular.module('brainmusic.controllers', ['ngCordova','ngStorage','ngResource']);
	app.controller('LoginCtrl', ["$scope","$state","$location","$localStorage","$http","API_URL","blockUI",function($scope,$state,$location,$localStorage,$http,API_URL,blockUI){
		// Perform the login action when the user submits the login form
		$scope.user={};
		$scope.registerUser={};
		$scope.init=function()
		{
			if($localStorage.logged)
			{
				$location.path("/app/user/welcome");
			}
		}
		$scope.register_init=function()
		{
			$scope.searchCallback=function(query)
			{
				var result = [];
    			for (var i in $scope.tags)
				{
					var reg= new RegExp(query);
			        if ($scope.tags[i].text.match(reg))
					{
			            result.push($scope.tags[i]);
			        }
    			}
				return result;
			};
			blockUI.start();
			$http.get(API_URL+"/api/tag").success(function(data) {
				$scope.tags = data['objects'];
				console.log(data['objects'].length);
				blockUI.stop();
			}).error(function(data, status, headers, config) {
				console.error("Error getting tags");
				blockUI.stop();
			});
		};
		$scope.login = function()
		{
			if ((typeof this.user.password === "undefined" || this.user.password=="") || (typeof this.user.username === "undefined" || this.user.username==""))
			{
				alert("Debe completar los campos.");
			}
			else
			{
				var resp = $http({
					method:'POST',
					url:API_URL+"/api/login",
					data:JSON.stringify(this.user),
					headers:{'Content-Type': 'application/json'}
				}).then(function(resp){
					if(!resp.data.exist)
					{
						alert("Usuario o contraseña incorrectas");
					}
					else
					{
						$localStorage.userData=resp.data;
						$localStorage.logged=true;
						$location.path("/app/user/welcome");
					}
				},
				function(error)
				{
					alert("Ha ocurrido un error al iniciar sesión");
				});
			}

		};
		$scope.register=function()
		{
			if(this.registerUser.confirmPassword != this.registerUser.password)
			{
				alert("Las contraseñas deben coincidir");
			}
			else
			{
				delete this.registerUser['confirmPassword'];
				console.log(JSON.stringify(this.registerUser));
				console.log(this.registerUser.tagSelected);
				var resp = $http({
					method:'POST',
					url:API_URL+"/api/register",
					data:JSON.stringify(this.registerUser),
					headers:{'Content-Type': 'application/json'}
				}).then(function(resp){
					if(resp.data.registered)
					{
						alert("Username ya utilizado");
					}
					else
					{
						console.log(resp.data);
						$localStorage.userData=resp.data;
						$state.go('app.welcome',{}, {reload: true})
					}
				},
				function(error)
				{
					alert("Ha ocurrido un error al registrar al usuario");
				});
			}
		};
	}]);

})(window.angular);
