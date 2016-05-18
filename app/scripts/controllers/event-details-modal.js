'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:EventDetailsModalCtrl
 * @description
 * # EventDetailsModalCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('EventDetailsModalCtrl', function($scope, tournamentsService, global, $parse,$stateParams) {
        var event={};
        event.docId=$stateParams.eventId;
        $scope.event = event;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        function parseMatches() {
            var matchesRounds = [];

        }
        var indexedTeams = [];
        $scope.playersToFilter = function() {
            indexedTeams = [];
            return $scope.matches;
        }

        $scope.filterTeams = function(player) {
            var teamIsNew = indexedTeams.indexOf(player.roundName) == -1;
            if (teamIsNew) {
                indexedTeams.push(player.roundName);
            }
            return teamIsNew;
        }

        tournamentsService.getRecievedEntries(event.docId, 'ENTRY').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.recievedEntries = res.data.entries;
            } else {
                global.showErrorMessage(res.error.message);
            }
        })
        tournamentsService.getDirectEntries(event.docId, 'MAIN').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.directEntries = res.data.entries;
            } else {
                global.showErrorMessage(res.error.message);
            }
        })
        $scope.getMatches = function() {
            $scope.loading = true;
            tournamentsService.getScheduledMatches(event.docId).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    var matches = res.data.matches || [];
                    $scope.matches = matches;
                    parseMatches();
                    if (matches.length == 0) {
                        global.showErrorMessage(res.data.message);
                        $mdDialog.cancel();
                    }
                } else {
                    global.showErrorMessage(res.error.message);
                }
            })
            

        }
        $scope.draw=function(){
                    tournamentsService.getMatchResult(event.docId, 'MAIN').then(function(res) {
            if (res.status == global.SUCCESS) {
                var json1 = JSON.stringify(eval("(" + res.data.teams + ")"));
                var json2 = JSON.stringify(eval("(" + res.data.results + ")"));
                var bigData = { teams: angular.fromJson(json1), results: angular.fromJson(json2) };
                angular.element('#tournamentBracket1').bracket({
                    skipConsolationRound: true,
                    init: bigData
                });
            }
            })
                
        }
        $scope.draw();
        $scope.getMatches();
        $scope.getScores = function(teams) {
            var score = [];
            for (var i = 0; i <= teams[0].scores.length - 1; i++) {
                score.push(teams[0].scores[i] + '-' + teams[1].scores[i]);
            }
            return score.join(',');
        }

               tournamentsService.getMatchResult(event.docId, 'MAIN').then(function(res) {
            if (res.status == global.SUCCESS) {

            }
            })

    });
