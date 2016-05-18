'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:RegistertournamentCtrl
 * @description
 * # RegistertournamentCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('RegistertournamentCtrl', function($scope, global, $mdDialog, $mdMedia, $state, tournamentsService) {

        tournamentsService.getTournaments().then(function(res) {
            $scope.loading = true;
            if (res.status == global.SUCCESS) {
                $scope.loading = false;
                $scope.tournaments = res.data.tournaments;                
            }

        })
        $scope.getEvents = function(tournamentId, index) {
            if (!$scope.tournaments[index].eventsLoaded) {
                $scope.tournaments[index].eventsLoading = true;
                tournamentsService.getEvents(tournamentId).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.tournaments[index].events = res.data.events;
                        $scope.tournaments[index].eventsLoaded = true;
                        $scope.tournaments[index].eventsLoading = false;
                    } else {
                        $scope.tournaments[index].eventsLoading = false;
                    }

                })
            }
        }
    });