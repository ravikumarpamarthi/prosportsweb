'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:CreatetournamentCtrl
 * @description
 * # CreatetournamentCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('CreatetournamentCtrl', function($scope, metadataService, association, tournamentsService, global) {
        $scope.submit = function() {
            $scope.submitted = true;
            if ($scope.createTournamentForm.$valid) {
                $scope.disable = true;
                $scope.loading = true;
                if($scope.data.location){
                  $scope.data.location=$scope.data.location.formatted_address
                }
                tournamentsService.saveTournament($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.loading = false;
                        $scope.showSuccessMessage(res.data.message);
                        $scope.go('root.tournaments');
                        $scope.disable = false;
                    } else if (res.status == global.FAILURE) {
                        $scope.disable = false;
                        $scope.showErrorMessage(res.error.message);
                    }
                })

            } else {

            }
        }

        $scope.init = function() {
            $scope.loading = true;
            metadataService.getMetadata('SPORT_TYPE').then(function(res) {
                $scope.sportTypes = res.data.masterData.options;
                $scope.loading = false;
            });

            metadataService.getMetadata('SERIES').then(function(res) {
                $scope.seriesData = res.data.masterData.options;
                $scope.loading = false;

            });
            association.getAllAssociations(global.userId).then(function(res) {
                $scope.associations = res.data.associations;
                $scope.loading = false;

            });

            association.getAllRegisteredUsers().then(function(res) {
                if (res.status == 'SUCCESS') {
                    $scope.profiles = res.data.profiles;
                    $scope.loading = false;

                }
                else{
                    $scope.loading = false;

                }
            });
        }

        $scope.init();

        $scope.status = global.statusData;
    });
