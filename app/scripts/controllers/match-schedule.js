'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:MatchScheduleCtrl
 * @description
 * # MatchScheduleCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('MatchScheduleCtrl', function($scope, global, $mdDialog, tournamentsService, metadataService,match, vm) {
        $scope.match=match;
        metadataService.getMetadata('MATCH_CONDITION').then(function(res) {
            $scope.conditions = res.data.masterData.options;
        });

        tournamentsService.getTournamentCourts(vm.tournamentDocId).then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.courts = res.data.courts || [];
            } else {
                global.showErrorMessage(res.error.message);
            }
        })
        $scope.data = match;
        // $scope.data.court = match.court.venuName;
        $scope.data.date = match.startTime.split(' ')[0];
        $scope.data.time = match.startTime.split(' ')[1];
        console.log($scope.data);
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };
        $scope.schedule = function(form, data) {
            $scope.submitted = true;
            if (form.$valid) {
               var obj=$scope.data;
               obj.docId=match.docId;
               obj.venueDocId=obj.court.split(',')[0];
               obj.courtId=obj.court.split(',')[1];
               obj.startTime=obj.date+' '+moment(obj.time).format("HH:mm");
                tournamentsService.scheduleMatch(obj).then(function(res) {
                        if (res.status == global.SUCCESS) {
                            global.showSuccessMessage(res.data.message); 
                            $mdDialog.hide(data);
                        } else {
                            global.showErrorMessage(res.error.message);
                        }
                    })
            }
        };

    });
