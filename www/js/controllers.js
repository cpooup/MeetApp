//Login Page
MeetApp.controller("LoginController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.login = function () {
//        $cordovaOauth.facebook("115777701818035", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function (result) {
//            $localStorage.accessToken = result.access_token;
//            $location.path("/LookForInvites");
//        }, function (error) {
//            alert("There was a problem signing in!  See the console for logs");
//            console.log(error);
//        });
        $location.path("/EditProfile");
    };

});

//Edit Profile Page
MeetApp.controller("EditProfileController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.nextUploadImages = function () {
        $location.path("/UploadImages");
    };
    $scope.nextEditPreferences = function () {
        $location.path("/EditPreferences");
    };
});

//Upload Images Page
MeetApp.controller("UploadImagesController", function ($scope, $cordovaOauth, $localStorage, $location, Camera,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.nextEditPreferences = function () {
        $location.path("/EditPreferences");
    };

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {
            console.log(imageURI);
        }, function (err) {
            console.err(err);
        });
    };

//  $scope.takePic = function() {
//        var options =   {
//            quality: 50,
//            destinationType: Camera.DestinationType.FILE_URI,
//            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
//            encodingType: 0     // 0=JPG 1=PNG
//        }
//        navigator.camera.getPicture(onSuccess,onFail,options);
//    };
//    var onSuccess = function(FILE_URI) {
//        console.log(FILE_URI);
//        $scope.picData = FILE_URI;
//        $scope.$apply();
//    };
//    var onFail = function(e) {
//        console.log("On fail " + e);
//    }
//    $scope.send = function() {   
//        var myImg = $scope.picData;
//        var options = new FileUploadOptions();
//        options.fileKey="post";
//        options.chunkedMode = false;
//        var params = {};
//        params.user_token = localStorage.getItem('auth_token');
//        params.user_email = localStorage.getItem('email');
//        options.params = params;
//        var ft = new FileTransfer();
//        ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
//    };

});

//Edit Preferences Page
MeetApp.controller("EditPreferencesController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.Submit = function () {
        $location.path("/app/Home");
    };
    $scope.isCheckedMen = {
       value : true
    };
    $scope.isCheckedWoman = {
       value : true
    };
    $scope.isCheckedAll = {
       value : true
    };
    $scope.isCheckedParty = {
       value : false
    };
    $scope.km = {
       rangeMin:1,
       rangeMax:50,
       min:1,
       max:30,
       center:30
    };
    $scope.aged = {
       rangeMin:18,
       rangeMax:50,
       min:20,
       max:30
    };

});

MeetApp.controller("ProfileController", function ($scope, $http, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.init = function () {
        if ($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json"}}).then(function (result) {
                $scope.profileData = result.data;
            }, function (error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };

});

MeetApp.controller("FeedController", function ($scope, $http, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.init = function () {
        if ($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me/feed", {params: {access_token: $localStorage.accessToken, format: "json"}}).then(function (result) {
                $scope.feedData = result.data.data;
                $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: $localStorage.accessToken, fields: "picture", format: "json"}}).then(function (result) {
                    $scope.feedData.myPicture = result.data.picture.data.url;
                });
            }, function (error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };

});

MeetApp.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicViewService) {
  $ionicViewService.nextViewOptions({
        disableBack: true
    });
});

//Home Page
MeetApp.controller("HomeController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.CreateInvite = function () {
        console.log("test");
        $location.path("/app/TakeAPicture");
    };
    $scope.StartFlipping = function () {
        $location.path("/app/LookForInvites");
    };
});

//Take A Picture Page
MeetApp.controller("TakeAPictureController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.Next = function () {
        $location.path("/app/InviteFrom");
    };
});

//Look For Invites Page
MeetApp.controller("LookForInvitesController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });

    $scope.InviteYes = function () {
        $location.path("/app/TakeAPicture");
    };
    $scope.InviteInfo = function () {
        $location.path("/app/EditPreferences");
    };
    $scope.InviteNo = function () {
        $location.path("/app/EditPreferences");
    };
});

//Invite From Page
MeetApp.controller("InviteFromController", function ($scope, $cordovaOauth, $localStorage, $location,$ionicViewService) {
    $ionicViewService.nextViewOptions({
        disableBack: true
    });
    $scope.RetakePhoto = function () {
        $location.path("/app/TakeAPicture");
    };
    $scope.CreateInvite = function () {
        $location.path("/EditPreferences");
    };
});

MeetApp.factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
}]);

