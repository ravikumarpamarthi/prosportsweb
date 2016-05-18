'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('ForgotpasswordCtrl', function($scope, $state,profile,global) {


        $scope.current = $state.$current;



     /*   if ($scope.current.url.sourcePath == '/forgotpassword') {
            $('#loginID').hide();
            $('#logoutID').hide();
        } else {
            $('#loginID').hide();
            $('#logoutID').hide();
        }*/
$scope.sendPassword=function(data){
    profile.forgotPassword(data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                         $scope.showSuccessMessage(res.data.message);
                        $scope.data={}
                        $scope.data.mobile=data;
                        global.setLocalItem("registration",$scope.data,true);
                         $state.go('root.otp')
                    }

                });
}

    });
