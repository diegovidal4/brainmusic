(function (angular){
	'use strict';
	var app=angular.module('brainmusic.controllers');
	app.factory('brainService',["$cordovaBluetoothSerial",function($cordovaBluetoothSerial){
		var brain={};
		brain.bytesToString=function(buffer) {
    		return String.fromCharCode.apply(null, new Uint8Array(buffer));
		};
		brain.convertToVolt=function(rawValue){
			return (rawValue*(1.8/4096))/2000 //The result is in uV
		};
		brain.randomFromInterval=function(min,max) //Return random values between min and max
		{
		    return Math.random()*(max-min+1)+min;
		};
		brain.getRawValues=function(){ //Creates random brainwaves using values between frecuency ranges
			var rawValues={
				delta:brain.randomFromInterval(0.5,2.75),
				theta:brain.randomFromInterval(3.5,6.75),
				loAlpha:brain.randomFromInterval(7.5,9.25),
				hiAlpha:brain.randomFromInterval(10,11.75),
				loBeta:brain.randomFromInterval(13,16.75),
				hiBeta:brain.randomFromInterval(18,29.75),
				loGamma:brain.randomFromInterval(31,39.75),
				midGamma:brain.randomFromInterval(41,49.75)
			};

		};
		brain.connect=function(MAC_ADDRESS)
		{
			$cordovaBluetoothSerial.connect(MAC_ADDRESS).then(function(){
				console.log("connected");
	        },function(){

			});
		};
		brain.getData=function()
		{
			$cordovaBluetoothSerial.read(function(data){
				console.log(this.bytesToString(data));
			},function(){
				console.error("Error reading brainwaves")
			})
		}
		return brain;
	}]);
	app.controller('UserCtrl',["$http","$scope","$interval","$location","$state","$localStorage","$cordovaBluetoothSerial","API_URL","MAC_ADDRESS","brainService",function($http,$scope,$interval,$location,$state,$localStorage,$cordovaBluetoothSerial,API_URL,MAC_ADDRESS,brainService){
	 	function bytesToString(buffer) {
    		return String.fromCharCode.apply(null, new Uint8Array(buffer));
		};
		(function init(){
			$scope.show='';
			$scope.user=$localStorage.userData;
			document.addEventListener("deviceready", function () { //Use this listener before any cordova plugin
				$cordovaBluetoothSerial.connect(MAC_ADDRESS).then(function(){
					console.log("connected");
					$interval(readData, 5000);
		        },function(){
					alert("Conectar el neurosky para utilizar ondas cerebrales");
					ionic.Platform.exitApp();
				});
			});
		})()

		function readData()
		{
			$cordovaBluetoothSerial.read().then(function(data){
				console.log(data);
				console.log(brainService.bytesToString(data));
			},function(){
				console.log("feo");
			});
		}

		//Bluetooth

		$scope.logout=function()
		{
			delete $localStorage.userData;
			delete $localStorage.logged;
			$state.go('login');
		};
		$scope.changeView=function(status,with_brain)
		{
			$localStorage.brain=parseInt(with_brain);
			if(status=="Training")
			{
				$location.path("/app/user/training");
			}
			else
			{
				$location.path("/app/user/recommender");
			}
		};
	}]);
})(window.angular);
