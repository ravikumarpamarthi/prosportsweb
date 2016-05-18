'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:PlayerPreparationAddPlayerModalCtrl
 * @description
 * # PlayerPreparationAddPlayerModalCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('PlayerPreparationAddPlayerModalCtrl', function($scope, $mdDialog, profile, global, eventDocId) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };
        $scope.userSearch = function(key) {
            profile.userSearch(key).then(function(res) {
                if (res.status == global.SUCCESS) {
                    $scope.userData = res.data.user;
                } else {
                    global.showErrorMessage(res.error.message);
                }
            })
        }

        $scope.addUserToEvent = function(user) {
            var data = { eventDocId: eventDocId, players:[{docId:user.docId}]};
            profile.userEntry(data).then(function(res) {
                if (res.status == global.SUCCESS) {
                    $scope.userData = res.data.user;
                    global.showSuccessMessage(res.data.message);
                } else {
                    global.showErrorMessage(res.error.message);
                }
            })
        }
        $scope.savePlayer = function(form, player) {
            $scope.submitted = true;
            if (form.$valid) {
                player.registerType = 'EVENT_ADMIN';
                profile.addPlayer(player).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.player = {};
                        $scope.addPlayer = false;
                        global.showSuccessMessage(res.data.message);
                        var user = res.data.profile;
                        var data = { eventDocId: eventDocId, playerDocId: user.docId };
                        profile.userEntry(data).then(function(res) {
                            if (res.status == global.SUCCESS) {
                                $scope.userData = res.data.user;
                                $scope.hide();
                                global.showSuccessMessage(res.data.message);
                            } else {
                                global.showErrorMessage(res.error.message);
                            }
                        })

                    } else {
                        global.showErrorMessage(res.error.message);
                    }
                })
            }

        }


    });
