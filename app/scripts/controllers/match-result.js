'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:MatchResultCtrl
 * @description
 * # MatchResultCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('MatchResultCtrl', function($scope, global, $mdDialog, tournamentsService, match, vm) {
        $scope.match = match;
        $scope.data = { team1Scores: {}, team2Scores: {} };
        if (match.teams[0].scores.length > 0) {
            var team1Scores = match.teams[0].scores;
            for (var i = 0; i <= team1Scores.length - 1; i++) {
                $scope.data.team1Scores[i] = team1Scores[i];
            }
        }
        if (match.teams[1].scores.length > 0) {
            var team2Scores = match.teams[1].scores;
            for (var i = 0; i <= team2Scores.length - 1; i++) {
                $scope.data.team2Scores[i] = team2Scores[i];
            }
        }

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };
        $scope.updateScore = function(form, data) {
            if (data.matchOver == "YES" && data.team1Scores && data.team2Scores) {
                $scope.submitted = true;
                if (form.Winner.$valid) {
                    if (Object.keys(data.team1Scores).length == Object.keys(data.team2Scores).length) {
                        $scope.scoreUpdate(form, data);
                    } else {
                        global.showErrorMessage("Please Check Scores Correctly");
                    }
                }

            } else if (Object.keys(data.team1Scores).length > 0 && Object.keys(data.team2Scores).length) {
                if (Object.keys(data.team1Scores).length == Object.keys(data.team2Scores).length) {
                    $scope.scoreUpdate(form, data);
                } else {
                    global.showErrorMessage("Please Check Scores Correctly");
                }

            } else {
                global.showErrorMessage("Please Enter Scores to Update OR Select Winner");
            }

        };
        $scope.scoreUpdate = function(form, data) {
            var team1Scores = [],
                team2Scores = [];
            for (var key in $scope.data.team1Scores) {
                if ($scope.data.team1Scores.hasOwnProperty(key)) {
                    team1Scores.push($scope.data.team1Scores[key]);
                }
            }
            for (var key in $scope.data.team2Scores) {
                if ($scope.data.team1Scores.hasOwnProperty(key)) {
                    team2Scores.push($scope.data.team2Scores[key]);
                }
            }
            var obj = {};
            obj.matchDocId = match.docId;
            obj.team1Scores = team1Scores;
            obj.team2Scores = team2Scores;
            tournamentsService.updateScore(obj).then(function(res) {
                if (res.status == global.SUCCESS) {
                    if ($scope.data.matchOver == 'YES') {
                        var obj = {};
                        obj.docId = match.docId;
                        obj.winnerPosition = $scope.data.result;
                        tournamentsService.completMatch(obj).then(function(res) {
                            if (res.status == global.SUCCESS) {
                                global.showSuccessMessage(res.data.message);
                                $mdDialog.hide();
                            } else {
                                global.showErrorMessage(res.error.message);
                            }
                        });
                    } else {
                        global.showSuccessMessage(res.data.message);
                        $mdDialog.hide();
                    }
                } else {
                    global.showErrorMessage(res.error.message);
                }
            })
        }


    });
