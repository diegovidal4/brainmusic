(function (angular){
	'use strict';
	var app=angular.module('brainmusic.controllers');
	app.controller('RecomCtrl',["$http","$scope","$location","$localStorage","$cordovaBluetoothSerial","$ionicHistory","API_URL",function($http,$scope,$location,$localStorage,$cordovaBluetoothSerial,$ionicHistory,API_URL){
		$scope.user=$localStorage.userData;


		//Bluetooth

        (function init(){
			// alert("Se procedera a leer los datos del equipo...");
            var with_brain=$localStorage.brain;
			// document.addEventListener("deviceready", function () { //Use this listener before any cordova plugin
			// 	$cordovaBluetoothSerial.read().then(function(data){
			// 		console.log(data);
		    //     },function(){
			// 		alert("Conectar el neurosky para utilizar ondas cerebrales");
			// 	});
			// });
            $http.post(API_URL+"/api/recom",{user_id:$scope.user.id}).success(function(data) {
                for(var artist in data)
				{

					if(angular.equals({}, data[artist]))
					{
						delete data[artist];
					}
				}
                console.log(data[0]);
				$scope.artists=data;
			}).error(function(data, status, headers, config) {
				alert("Error al generar la recomendación");
                $ionicHistory.goBack();
			});
        })()

		$scope.like=function(like,artist,song_name,song_data)
		{
			var artistLength=Object.keys($scope.artists).length;
			var with_brain=$localStorage.brain;
			var final_data=song_data;
			delete final_data.track; //delete track key from json for send
			delete $scope.artists[artist][song_name]; // and delete from the list

			if(Object.keys($scope.artists[artist]).length==0) // if the artist dosnt have more songs
			{
				delete $scope.artists[artist];
			}


			$http.post(API_URL+"/api/like/"+with_brain+"/"+like,{user_id:$scope.user.id,data:song_data}).success(function(data) {
				// if(artistLength==1)
				// {
				// 	alert("Entrenamiento completado");
				// 	$ionicHistory.goBack();
				// 	return false;
				// }
			}).error(function(data, status, headers, config) {
				console.error("Error sending song data");
				$ionicHistory.goBack();
			});

		};
	}]);
})(window.angular);
