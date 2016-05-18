'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:ViewtournamentCtrl
 * @description
 * # ViewtournamentCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('ViewtournamentCtrl', function($scope, global, $mdDialog, $mdMedia, $state, tournamentsService) {
        tournamentsService.getTournaments().then(function(res) {
            $scope.loading = true;
            if (res.status == global.SUCCESS) {
                $scope.tournaments = res.data.tournaments;
                $scope.loading = false;
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

        $scope.viewEventDetails = function(ev,event) {
             $state.go('root.eventdetails',{eventId:event.docId});
            /*var useFullScreen = true;
            $mdDialog.show({

                    controller: 'EventDetailsModalCtrl',
                    templateUrl: 'views/event-details-modal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals:{
                        event:event
                    }
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';

                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });*/
        };

    });