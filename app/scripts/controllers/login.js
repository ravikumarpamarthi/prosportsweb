'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('LoginCtrl', function($scope, $state, authentication, global, $mdToast) {

        $scope.$emit("initauthentication", true);
        $scope.submit = function(form) {
            $scope.submitted = true;
            if ($scope.loginForm.$valid) {
                $scope.disable = true;
                $scope.loading = true;
                authentication.login($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        global.setLocalItem("authentication", res, true);
                        $scope.showSuccessMessage(res.data.message);
                        $scope.$emit("initauthentication", true);
                        $state.go("root.viewtournament");
                        $scope.disable = false;
                    } else if (res.status == global.FAILURE) {
                        $scope.disable = false;   
                        $scope.loading = false;                     
                        if (res.error.code == "EC_INCORRECT_USERNAME_PASSWORD") {
                            $scope.loginError = "Incorrect username or password";
                            $scope.showErrorMessage(res.error.message);
                        }
                    }
                }, function(err) {
                    $scope.loginError = global.ERR_CONNECTION_REFUSED;

                });
            } else {
                
            }
        }
    });
