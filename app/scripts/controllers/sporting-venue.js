'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('SportingVenueCtrl', function($scope, $state, $mdToast, association, $mdDialog, $mdMedia, profile, global) {
        $scope.current = $state.$current;

        function getVenues() {
            $scope.loading = true;
            association.getAllVenues().then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.courtAdminList = res.data.venues;
                } else if (res.status == global.FAILURE) {}
            }, function(err) {
                $scope.loginError = global.ERR_CONNECTION_REFUSED;
            });
        }
        getVenues();

    });
