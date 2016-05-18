'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:CreateassociationCtrl
 * @description
 * # CreateassociationCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('CreateassociationCtrl', function($scope, $mdDialog, $mdMedia, $state, association, global, $mdToast, profile) {
        profile.sportTypes('SPORT_TYPE').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.sportType = res.data.masterData.options;
            } else if (res.status == global.FAILURE) {}
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
        });

        association.getAllRegisteredUsers().then(function(res) {
            if (res.status == 'SUCCESS') {
                if (res.data.profiles.length > 0) {
                    $scope.people = res.data.profiles; //$scope.associationList = res.data.list;
                } else {
                    $scope.associationsErr = 'No Associations Found.';
                }
            }

        }, function(err) {

        });

        $scope.submit = function(form) {
            $scope.submitted = true;
            if ($scope.createAssociationForm.$valid) {
                $scope.disable = true;
                $scope.loading = true;
                $scope.data.sportTypes=[$scope.data.sportTypes];
                association.createAssociation($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.loading = false;
                        global.showSuccessMessage(res.data.message);
                        $state.go("root.associations");
                        $scope.disable = false;
                    } else if (res.status == global.FAILURE) {
                        $scope.disable = false;
                        global.showErrorMessage(res.error.message);
                    }
                });

            } else {

            }
        }
    })
