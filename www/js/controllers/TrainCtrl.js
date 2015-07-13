(function (angular){
	'use strict';
	var app=angular.module('brainmusic.controllers');
	app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
	}]);
	app.controller('TrainCtrl',["$scope","$http","$location","$localStorage","$ionicHistory","API_URL",function($scope,$http,$location,$localStorage,$ionicHistory,API_URL){
		$scope.artists={};
		$scope.user=$localStorage.userData;

		(function init(){
			var with_brain=$localStorage.brain;
        	$http.post(API_URL+"/api/train/"+with_brain,{id:$scope.user.id}).success(function(data) {
				for(var artist in data)
				{

					if(angular.equals({}, data[artist]))
					{
						delete data[artist];
					}
				}
				$scope.artists=data;
			}).error(function(data, status, headers, config) {
				console.error("Error getting data");
				$scope.artists=[];
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
					console.log({});
			}).error(function(data, status, headers, config) {
				console.error("Error sending song data");
				// $ionicHistory.goBack();
			});

		};
	}]);

})(window.angular);
