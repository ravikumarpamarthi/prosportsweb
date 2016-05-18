'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:PlayerPreparationAddPlayerDoublesCtrl
 * @description
 * # PlayerPreparationAddPlayerDoublesCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('PlayerPreparationAddPlayerDoublesCtrl', function($scope, $mdDialog, profile, global, eventDocId,teamSize) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };
         $scope.teamSize=teamSize;
        $scope.players=[];
        $scope.userSearch = function(key) {
            $scope.searchCircular=true;
            profile.userSearch(key).then(function(res) {
                if (res.status == global.SUCCESS) {
                    $scope.userData = res.data.user;
                } else {
                    global.showErrorMessage(res.error.message);
                }
                $scope.searchCircular=false;
            })
        }
        
        $scope.addPlayer=function(player){
            $scope.players.push(player);
            $scope.userData='';
        }

        $scope.remove=function(index){
        	$scope.players.splice(index, 1);
        }

        $scope.addPlayersToEvent = function() {
            $scope.addEntryCircular=true;
        	var players=[]
        	for (var i = $scope.players.length - 1; i >= 0; i--) {
        		 players.push({ docId: $scope.players[i].docId });
        	}
            var data = { eventDocId: eventDocId, players: players };
            profile.userEntry(data).then(function(res) {
                $scope.addEntryCircular=false;
                if (res.status == global.SUCCESS) {
                    $scope.userData = res.data.user;
                    global.showSuccessMessage(res.data.message);
                    $scope.cancel();
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
                        $scope.newPlayer = false;
                        global.showSuccessMessage(res.data.message);
                        var user = res.data.profile;
                        $scope.players.push(user);
                        
                    } else {
                        global.showErrorMessage(res.error.message);
                    }
                })
            }

        }


    });
