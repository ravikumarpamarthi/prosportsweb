'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:AddVenueCtrl
 * @description
 * # AddVenueCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('AddVenueCtrl', function($scope, $state, $mdToast, association, $mdDialog, $mdMedia, profile, global) {
        profile.sportTypes('SPORT_TYPE').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.sportType = res.data.masterData.options;

            } else if (res.status == global.FAILURE) {}
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
        });
        $scope.data = { courts: [] }
        $scope.addVenue = function(form) {

            if(form.$valid){
                $scope.submitted=true;
                $scope.data.sportTypes = [$scope.data.sportTypes];
                if ($scope.data.location && $scope.data.location.formatted_address) {
                    $scope.data.location = $scope.data.location.formatted_address;
                }

                association.addVenue($scope.data).then(function(res) {
                    if (res.status == global.SUCCESS) {
                        $scope.showSuccessMessage(res.data.message);
                        //$mdToast.show($mdToast.simple().textContent(res.data.message).position('top right').hideDelay(3000));
                        $state.go('root.sporting-venue');
                    } else if (res.status == global.FAILURE) {
                        $scope.showErrorMessage(res.error.message);
                        //$mdToast.show($mdToast.simple().textContent(res.error.message).position('top right').hideDelay(3000));

                    }
                }, function(err) {
                    $scope.loginError = global.ERR_CONNECTION_REFUSED;

                });
            }else{
                $scope.submitted=true;
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
                        $scope.lights = [{ name: 'Yes' }, { name: 'No' }];

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
    }).controller('AddVenueModelCtrl', function($scope, ngTableParams, association, items, $mdDialog, profile, global) {
        console.log(items);

        $scope.addCourt = function() {
            $scope.data.venueDocId = items;
            association.addCourt($scope.data).then(function(res) {
                if (res.status == global.SUCCESS) {
                    $scope.courtType = res.data.masterData.options;
                } else if (res.status == global.FAILURE) {}
            }, function(err) {
                $scope.loginError = global.ERR_CONNECTION_REFUSED;

            });
        };
        profile.sportTypes('COURT_TYPE').then(function(res) {
            if (res.status == global.SUCCESS) {
                $scope.courtType = res.data.masterData
.options;
            } else if (res.status == global.FAILURE) {

            }
        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
        });
        //$scope.courtType = [{ name: 'Clay' }, { name: 'Grass' }, { name: 'Synthetic' }, { name: 'Hard Courts' }]
        $scope.lights = global.lights;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);


        };
    });
