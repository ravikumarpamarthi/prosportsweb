'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:TournamentslistCtrl
 * @description
 * # TournamentslistCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('TournamentslistCtrl', function($scope,global, $mdDialog, $mdMedia,tournamentsService) {
        $scope.init = function() {
            $scope.loading = true;
            tournamentsService.getTournaments().then(function(res) {
                 $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.tournaments = res.data.tournaments;
                }

            })
        }
        $scope.init();
    });
