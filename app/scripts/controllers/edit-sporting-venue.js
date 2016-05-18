'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:EditSportingVenueCtrl
 * @description
 * # EditSportingVenueCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('EditSportingVenueCtrl', function($scope, $state, $mdToast, association, $mdDialog, $mdMedia, metadataService, global,$stateParams) {
        metadataService.getMetadata('SPORT_TYPE').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.sportType = res.data.masterData.options;

            } else if (res.status == global.FAILURE) {}
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
        });

        association.getVenue($stateParams.id).then(function(res){
        	 if (res.status == global.SUCCESS) {
                $scope.data = res.data.venue;

            } else if (res.status == global.FAILURE) {}
        })
        $scope.updateVenue = function(form) {

            if (form.$valid) {
                $scope.submitted = true;
                if ($scope.data.location && $scope.data.location.formatted_address) {
                    $scope.data.location = $scope.data.location.formatted_address;
                }

                association.updateVenue($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.showSuccessMessage(res.data.message);
                        $state.go('root.sporting-venue');
                    } else if (res.status == global.FAILURE) {
                        $scope.showErrorMessage(res.error.message);

                    }
                }, function(err) {
                    $scope.loginError = global.ERR_CONNECTION_REFUSED;

                });
            } else {
                $scope.submitted = true;
            }

        }
        $scope.showAdvanced = function(ev, venue, index) {
            var useFullScreen = true;
            $mdDialog.show({
                    controller: function($scope, association, venue, index, $mdDialog, profile, global) {
                        $scope.data = (venue) ? venue : {};
                        profile.sportTypes('COURT_TYPE').then(function(res) {
                            if (res.status == global.SUCCESS) {
                                $scope.courtType = res.data.masterData.options;
                            } else if (res.status == global.FAILURE) {

                            }
                        });
                        $scope.lights = global.lights;

                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.save = function(form, venue) {
                            $scope.submitted = true;
                            if (form.$valid) {
                                var data = {
                                    venue: venue,
                                    index: index
                                }
                                $mdDialog.hide(data);
                            }
                        };
                    },
                    templateUrl: 'views/addcourtmodel.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        venue: venue,
                        index: index
                    }
                })
                .then(function(data) {
                    if (data.index != undefined) {
                        $scope.data.courts[data.index] = data.venue;
                    } else {
                        $scope.data.courts.push(data.venue);
                    }
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
    });
