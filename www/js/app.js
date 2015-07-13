// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function(){
  'use strict';
  //
  var app=angular.module('brainmusic', ['ionic','mediaPlayer','ionic-material','ion-autocomplete','blockUI','angular-loading-bar','ngCordova','brainmusic.controllers']);
  //Production
  app.constant("API_URL","http://brainmusic-diegovidal.rhcloud.com");
  app.constant("MAC_ADDRESS","20:68:9D:91:D3:13");
  //Localhost
  //app.constant("API_URL","http://127.0.0.1:8081");

  app.run(function($ionicPlatform) {
  	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
		// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
  });

app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
});

  app.config(function($stateProvider, $urlRouterProvider,blockUIConfig) {
      //BlockUI config
    blockUIConfig.message = 'Cargando...';
  $stateProvider
  .state('login', {
	url: "/login",
	templateUrl: "templates/login.html",
	controller: 'LoginCtrl'
  })
  .state('register', {
	url: "/register",
	templateUrl: "templates/register.html",
	controller: 'LoginCtrl'
  })
  .state('app', {
	url: "/app",
	abstract: true,
	templateUrl: "templates/menu.html",
    controller:"MenuCtrl"
  })
   .state('app.profile', {
    cache: false,
	url: "/user/profile",
	 views: {
	  'menuContent': {
		templateUrl: "templates/dashboard.html",
		controller: "UserCtrl"
	  }
	}
  })
  .state('app.welcome', {
    cache: false,
	url: "/user/welcome",
	 views: {
	  'menuContent': {
		templateUrl: "templates/welcome.html",
		controller: "UserCtrl"
	  }
	}
  })
  .state('app.training', {
      cache: false,
	url: "/user/training",
	 views: {
	  'menuContent': {
		templateUrl: "templates/training.html",
		controller: "TrainCtrl"
	  }
    }
    })
    .state('app.recommender', {
        cache: false,
    	url: "/user/recommender",
    	 views: {
    	  'menuContent': {
    		templateUrl: "templates/recommender.html",
    		controller: "RecomCtrl"
    	  }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
})();
