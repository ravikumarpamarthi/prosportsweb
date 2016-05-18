'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:EditassociationCtrl
 * @description
 * # EditassociationCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('EditassociationCtrl', function($scope, $stateParams, $mdDialog, $mdMedia, $state, association, global, profile, $mdToast) {
        $scope.$mdMedia = $mdMedia;
        association.getAssociation($stateParams.associd).then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.loading = false;
                $scope.data = res.data.association;
                $scope.data.adminDocId = $scope.data.admins[0].docId;
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
                if (res.data.profiles.length > 0) {
                    $scope.people = res.data.profiles;
                } else {
                    $scope.associationsErr = 'No Associations Found.';
                }

            }


        }, function(err) {

        });

        $scope.submit = function(form, teamDetails) {
            $scope.submitted = true;
            if ($scope.editAssociationForm.$valid) {
                $scope.disable = true;
                $scope.loading = true;                
                association.updateAssociationAllFields($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.loading = false;
                         global.showSuccessMessage(res.data.message);
                        $state.go("root.associationslist");
                        $scope.disable = false;                        
                    } else if (res.status == global.FAILURE) {
                        $scope.disable = false;
                        global.showErrorMessage(res.error.message);
                    }
                }, function(err) {
                    $scope.disable = true;
                    $scope.loginError = global.ERR_CONNECTION_REFUSED;
                });
            } else {}
        }
        $scope.showAdvanced = function(ev, team, index) {
            $mdDialog.show({
                    templateUrl: 'views/addteammodel.html',
                    controller: function($scope, team, index, $mdDialog) {
                        $scope.data = (team) ? team : {};
                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.answer = function(form, team) {
                            $scope.submitted=true;
                            if (form.$valid) {
                                var data = {
                                    team: team,
                                    index: index
                                }
                                $mdDialog.hide(data);
                            }

                        };
                    },
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        team: team,
                        index: index
                    }
                })
                .then(function(data) {
                    if (data.index != undefined) {
                        $scope.data.members[data.index] = data.team;
                    } else {
                        $scope.data.members.push(data.team);
                    }
                }, function() {

                });

        };

    });
