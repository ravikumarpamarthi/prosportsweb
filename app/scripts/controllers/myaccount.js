'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('MyaccountCtrl', function($scope, $state, profile, global, $mdToast) {
        $scope.current = $state.$current;
        $scope.vm = {};
        $scope.loading = true;
        profile.sportTypes('SPORT_TYPE').then(function(res) {
            $scope.loading = false;            
            if (res.status == global.SUCCESS) {
                $scope.sportType = res.data.masterData.options;
            } else if (res.status == global.FAILURE) {
                global.showErrorMessage(res.error.message);
            }
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;

        });
        $scope.loading = true;        
        profile.getProfile().then(function(res) {
            $scope.loading = false;
            if (res.status == global.SUCCESS) {
                var profile = res.data.profile;
                $scope.data = profile;
                if (profile.teamname != undefined && profile.teamname != '') {
                    $scope.vm.isOwner = true;
                } else {
                    $scope.vm.isOwner = false;
                }

                if (profile.schoolName != undefined && profile.schoolName != '') {
                    $scope.vm.student = true;
                } else {
                    $scope.vm.student = false;
                }

            } else if (res.status == global.FAILURE) {}
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;

        });
        $scope.selected = [];
        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };

        function updateProfile() {
            if ($scope.data.address && $scope.data.address.formatted_address) {
                $scope.data.address = $scope.data.address.formatted_address;
            }
            profile.updateProfile($scope.data).then(function(res) {
                if (res.status == "SUCCESS") {
                    global.showSuccessMessage(res.data.message);
                } else if (res.status == "FAILURE") {
                    global.showErrorMessage(res.error.message);
                }
            });
        }

        $scope.updateProfile = function(pic, form) {
            if (form.$valid) {
                $scope.submitted=true;
                if (pic) {
                    profile.imageUpload(pic).then(function(res) {
                        $scope.data.profileImage = res.data.fileId;
                        updateProfile();
                    })
                } else {
                    updateProfile();
                }
            }else{
                $scope.submitted=true;
            }
        }
        $scope.changeValue = function(value) {}

    });
