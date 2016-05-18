'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:OtpCtrl
 * @description
 * # RegisterCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('OtpCtrl', function($scope, $state, authentication, profile, global, $stateParams, $timeout) {

        $scope.data = global.getLocalItem("registration", true);
        if (!$scope.data) {
            $scope.data = {};
            var mobileOrEmail = global.getLocalItem("mobileOrEmail", true);
            $scope.data.mobileNo = mobileOrEmail;
        }
        $scope.authorization = {}
        $scope.$watch('data.otp', function(newVal, oldVal) {
            if (newVal && newVal.length == 6) {
                $scope.verify();
            }
        });

        $scope.verify = function() {
            $scope.errMessage = "";
            var verification = {};
            verification.mobileOrEmail = $scope.data.mobile;

            verification.verificationCode = $scope.data.otp;
            $scope.loading=true;
            authentication.otpVerification(verification).then(function(res) {
                if (res.status && res.status == global.SUCCESS) {
                    global.setLocalItem("authentication", res, true);
                    $scope.authorization.otpkey = true;
                    global.init();
                } else if (res.status == global.FAILURE) {
                     if (res.error && res.error.errors) {
                            var errors = res.error.errors;
                            for (var i = errors.length - 1; i >= 0; i--) {
                                $scope[errors[i].code] = errors[i].message;
                                $scope.errMessage = errors[i].message || "Please enter valid OTP";
                            };
                        }
                    
                }
                $scope.loading=false;
            }, function(err) {

            })
        }

        $scope.submitOtpForm = function(form) {
            $scope.submitted = true;
            $scope.errMessage = "";
            var data = {
                newPassword: $scope.data.password,
                registrationDocId: global.userId
            }
            if ($scope.otpPlusPasswordForm.$valid) {
                profile.changePwd(data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                         $scope.$emit("initauthentication", true);
                        $scope.successMessage = res.data.message;
                        $state.go('root.viewtournament');
                    } else if (res.status == global.FAILURE) {
                        $scope.errorMessage = res.error.message;
                    }
                })
            }
        };

    });
