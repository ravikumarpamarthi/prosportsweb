'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:CreateassociationCtrl
 * @description
 * # CreateassociationCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('EditassociationownerCtrl', function($filter, $scope, $state, $stateParams, $mdDialog, $mdMedia, association, global, $mdToast, profile) {
        association.getAssociation($stateParams.associd).then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.loading = false;
                $scope.data = res.data.association;
                $scope.data.adminDocId=$scope.data.admins[0].docId;
            } else if (res.status == global.FAILURE) {
                $scope.loginError = res.error.message;
            }
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
        });

        profile.sportTypes('SPORT_TYPE').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.sportType = res.data.masterData.options;
            } else if (res.status == global.FAILURE) {
            }
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
        });

        association.getAllRegisteredUsers().then(function(res) {
            if (res.status == 'SUCCESS') {
                var rigistrations=[];
                var profiles=res.data.profiles;
                if (res.data.profiles.length > 0) {
                   for (var i = 0; i <= profiles.length-1; i++) {
                        var profile={};
                            profile.docId=profiles[i].docId;
                            profile.name=profiles[i].name;
                            profile.email=profiles[i].email;
                            profile.mobile=profiles[i].mobile;
                            
                       rigistrations.push(profile);
                   }
                    $scope.people = rigistrations; //$scope.associationList = res.data.list;
                } else {
                    $scope.associationsErr = 'No Associations Found.';
                }
            }

        }, function(err) {

        });
        $scope.submit = function(form) {
            $scope.submitted = true;
            if ($scope.editAssociationOwnerForm.$valid) {
                $scope.disable = true;
                $scope.loading = true;                
                $scope.data.admins[0] = $filter('filter')($scope.people, { docId: $scope.data.adminDocId }, true)[0];
                association.updateAssociationOwner($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.loading = false;
                        global.showSuccessMessage(res.data.message);
                        $state.go("root.associations");
                        $scope.disable = false ;
                    } else if (res.status == global.FAILURE) {
                        $scope.disable = true;
                        global.showErrorMessage(res.error.message);
                    }
                }, function(err) {
                    $scope.loginError = global.ERR_CONNECTION_REFUSED;
                });

            } else {
            }
        }

    });
