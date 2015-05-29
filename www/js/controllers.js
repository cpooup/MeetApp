//Login Page
MeetApp.controller("LoginController", function ($scope, $cordovaOauth, $localStorage, $location, $http) {
    //$localStorage.accessToken=null;
    $scope.login = function () {
     if ($localStorage.hasOwnProperty("accessToken") === true) {
                    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status,friends,email", format: "json"}}).then(function (result) {
                                                                        console.log("result graph" + JSON.stringify(result));
                                                                        $localStorage.FBProfileData = result.data;
                                                                    }, function (error) {
                                                                        alert("There was a problem getting your profile.  Check the logs for details.");
                                                                        console.log(error);
                                                     });
                 $location.path("/app/Home");
            } else {
             $cordovaOauth.facebook("115777701818035", ["email", "public_profile", "user_friends"]).then(function (result) {
                        console.log("result login" + JSON.stringify(result));
                        $localStorage.FBaccessToken = result.access_token;
                        $localStorage.FBexpires_in = result.expires_in;
                        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: $localStorage.FBaccessToken, fields: "id,name,gender,location,website,picture,relationship_status,friends,email", format: "json"}}).then(function (result) {
                                                    console.log("result graph" + JSON.stringify(result));
                                                    $localStorage.FBProfileData = result.data;
                                                    $localStorage.ProfileImaegs.push(result.data.picture.data.url);
                                                    console.log("result ProfileImaegs" + JSON.stringify($localStorage.ProfileImaegs));
                                                },
                                                function (error) {
                                                    alert("There was a problem getting your profile.  Check the logs for details.");
                                                    console.log(error);
                                 });


                        $location.path("/EditProfile");
                         console.log("result localStorage" + JSON.stringify($localStorage));
                    }, function (error) {
                        alert("There was a problem signing in!  See the console for logs");
                        console.log(error);
                    });
            }

    };

});

//Edit Profile Page
MeetApp.controller("EditProfileController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.nextUploadImages = function () {
        $location.path("/UploadImages");
    };
    $scope.nextEditPreferences = function () {
        $location.path("/EditPreferences");
    };
});

//Upload Images Page
MeetApp.controller("UploadImagesController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.nextEditPreferences = function () {
        $location.path("/EditPreferences");
    };

    $scope.getPhoto = function () {
        navigator.camera.getPicture(onSuccess, onFail, {quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});

    }

    /* Camera */
    $scope.takePic = function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 75,
            destinationType: navigator.camera.DestinationType.DATA_URI,
            allowEdit: true,

        });
    }
    
    var onSuccess = function (DATA_URI) {
         console.log(DATA_URI);
         $scope.picData = DATA_URI;
         $scope.$apply();
    }
    var onFail = function (e) {
        console.log("On fail " + e);
    }
    
    $scope.send = function () {
        var myImg = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey = "post";
        options.chunkedMode = false;
        var params = {};
        params.user_token = localStorage.getItem('auth_token');
        params.user_email = localStorage.getItem('email');
        options.params = params;
        var ft = new FileTransfer();
        ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
    };

});

//Edit Preferences Page
MeetApp.controller("EditPreferencesController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.Submit = function () {
        $location.path("/app/Home");
    };
    $scope.isCheckedMen = {
        value: true
    };
    $scope.isCheckedWoman = {
        value: true
    };
    $scope.isCheckedAll = {
        value: true
    };
    $scope.isCheckedParty = {
        value: false
    };
    $scope.km = {
        rangeMin: 1,
        rangeMax: 50,
        min: 1,
        max: 30,
        center: 30
    };
    $scope.aged = {
        rangeMin: 18,
        rangeMax: 50,
        min: 20,
        max: 30
    };

});

MeetApp.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

});

//Home Page
MeetApp.controller("HomeController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.CreateInvite = function () {
        $location.path("/app/TakeAPicture");
    };
    $scope.StartFlipping = function () {
        $location.path("/app/LookForInvites");
    };
});

//Take A Picture Page
MeetApp.controller("TakeAPictureController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.Next = function () {
        $location.path("/app/InviteFrom");
    };
});

//Take A Picture Enroll Page
MeetApp.controller("TakeAPictureEnrollController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.RetakePhoto = function () {
        console.log("RetakePhoto");
    };
    $scope.Next = function () {
        $location.path("/app/WriteProposal");
    };
});

//Look For Invites Page
MeetApp.controller("LookForInvitesController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.InviteYes = function () {
        $location.path("/app/TakeAPictureEnroll");
    };
    $scope.InviteInfo = function () {
        $location.path("/app/UserInfo");
    };
    $scope.InviteNo = function () {
        console.log("InviteNo");
    };
});

//User Info Page
MeetApp.controller("UserInfoController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.ViewMore = function () {
        console.log("ViewMore");
    };
});

//Write Proposal Page
MeetApp.controller("WriteProposalController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.RetakePhoto = function () {
        console.log("RetakePhoto");
    };
    $scope.Send = function () {
        $location.path("/app/Proposals");
    };
});

//Invite From Page
MeetApp.controller("InviteFromController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.isCheckedShare = {
       value : true
    };
    $scope.isCheckedAll = {
       value : false
    };
    $scope.isCheckedParty = {
       value : true
    };
    $scope.RetakePhoto = function () {
        $location.path("/app/TakeAPicture");
    };
    $scope.CreateInvite = function () {
        $location.path("/app/Home");
    };
});

// Proposals Page
MeetApp.controller("ProposalsController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.Accept = function () {
        $location.path("/app/ShareLocation");
    };
    $scope.ChatFrist = function () {
       $location.path("/app/Chat");
    };
    $scope.Reject = function () {
       $location.path("/app/Chat");
    };
});

// Share Location Page
MeetApp.controller("ShareLocationController", function ($scope, $cordovaOauth, $localStorage, $location) {
    $scope.Confirm = function () {
        $location.path("/app/Chat");
    };
});