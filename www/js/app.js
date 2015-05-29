// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var MeetApp = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova','ui-rangeSlider'])

MeetApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

MeetApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            
            .state('EditProfile', {
                url: '/EditProfile',
                templateUrl: 'templates/EditProfile.html',
                controller: 'EditProfileController'
            })
            
            .state('UploadImages', {
                url: '/UploadImages',
                templateUrl: 'templates/UploadImages.html',
                controller: 'UploadImagesController'
            })
            
            .state('EditPreferences', {
                url: '/EditPreferences',
                templateUrl: 'templates/EditPreferences.html',
                controller: 'EditPreferencesController'
            })
            
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            
            .state('app.Home', {
                url: "/Home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Home.html"
                    }
                }
            })
            
            .state('app.LookForInvites', {
                url: "/LookForInvites",
                views: {
                    'menuContent': {
                        templateUrl: "templates/LookForInvites.html"
                    }
                }
            })
            
            .state('app.TakeAPicture', {
                url: "/TakeAPicture",
                views: {
                    'menuContent': {
                        templateUrl: "templates/TakeAPicture.html"
                    }
                }
            })
            
            .state('app.TakeAPictureEnroll', {
                url: "/TakeAPictureEnroll",
                views: {
                    'menuContent': {
                        templateUrl: "templates/TakeAPictureEnroll.html"
                    }
                }
            })
            
            .state('app.WriteProposal', {
                url: "/WriteProposal",
                views: {
                    'menuContent': {
                        templateUrl: "templates/WriteProposal.html"
                    }
                }
            })
            
            .state('app.UserInfo', {
                url: "/UserInfo",
                views: {
                    'menuContent': {
                        templateUrl: "templates/UserInfo.html"
                    }
                }
            })
            
            .state('app.Proposals', {
                url: "/Proposals",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Proposals.html"
                    }
                }
            })
            
            .state('app.InviteFrom', {
                url: "/InviteFrom",
                views: {
                    'menuContent': {
                        templateUrl: "templates/InviteFrom.html"
                    }
                }
            });
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/playlists');
    $urlRouterProvider.otherwise('/login');
});
