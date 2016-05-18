'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:EdittournamentCtrl
 * @description
 * # EdittournamentCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('EdittournamentCtrl', function($scope, $stateParams, $filter, global, metadataService, association, $mdDialog, ngTableParams, $mdMedia, tournamentsService) {
        $scope.vm = {};
        $scope.selectedCourts = [];
        $scope.init = function() {
            $scope.loading = true;
            getEvents();
            association.getAllVenues().then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.venues = res.data.venues;
                }
            });

            $scope.loading = true;
            tournamentsService.getTournament($stateParams.id).then(function(res) {
                $scope.loading = false;
                $scope.tournament = res.data.tournament;
                setBasicDetails();
                setModerators();
                setAddlInfo();
                setAccommodations();
                setCourts();
            })
        }

        function getEvents() {
            tournamentsService.getEvents($stateParams.id).then(function(res) {
                $scope.events = res.data.events;

            });
        }

        function setModerators() {
            $scope.moderators = $scope.tournament.moderators;
        }

        function setCourts() {
            $scope.courts = $scope.tournament.courts;
            $scope.selectedCourts = $scope.tournament.courts;
            $scope.loading = false;
        }
        $scope.selectCourt = function(item, list) {
            var selected = $filter('filter')(list, { courtId: item.courtId })[0];
            if (selected) {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i].courtId == selected.courtId) {
                        list.splice(i, 1);
                    }
                }
                // list.splice(idx, 1);
            } else {
                list.push(item);
            }
        }

        $scope.exists = function(item, list) {
            var selected = $filter('filter')(list, { courtId: item.courtId })[0];
            if (selected) {
                return true;
            } else {
                return false;
            }
        };

        function setAddlInfo() {
            $scope.addlInfo = $scope.tournament.addlInfo;
        }

        function setAccommodations() {
            $scope.accommodations = $scope.tournament.accommodations;
        }

        function setBasicDetails() {
            var basicdetails = {};
            basicdetails.entryEndDate = $scope.tournament.entryEndDate;
            basicdetails.entryStartDate = $scope.tournament.entryStartDate;
            basicdetails.entryWithdrawDate = $scope.tournament.entryWithdrawDate;
            basicdetails.finalListDate = $scope.tournament.finalListDate;
            basicdetails.fromDate = $scope.tournament.fromDate;
            basicdetails.hospitality = $scope.tournament.hospitality;
            basicdetails.otherDetails = $scope.tournament.otherDetails;
            basicdetails.phone = $scope.tournament.phone;
            basicdetails.prizeMoney = $scope.tournament.prizeMoney;
            basicdetails.toDate = $scope.tournament.toDate;
            var venues = $scope.tournament.venues;
            var venueDocIds = []
            for (var i = venues.length - 1; i >= 0; i--) {
                venueDocIds.push(venues[i].docId);
            }
            basicdetails.venueDocIds = venueDocIds;
            $scope.basicdetails = basicdetails;
            $scope.vm.hospitality = (basicdetails.hospitality) ? true : false;
        }

        $scope.init();

        $scope.updateTournamentBasicDetails = function(form) {
            $scope.submitted = true;
            $scope.invalidDateFromTo = true;
            if( $scope.basicdetails.toDate < $scope.basicdetails.fromDate ){
                $scope.invalidDateFromTo = true;
            }else {
                $scope.invalidDateFromTo = false;
            }
            if( $scope.basicdetails.entryEndDate < $scope.basicdetails.entryStartDate ){
                $scope.invalidEntryDateFromTo = true;
            }else {
                $scope.invalidEntryDateFromTo = false;
            }

            if (form.$valid) {
                $scope.basicdetails.docId = $stateParams.id;
                $scope.loading = true;
                tournamentsService.updateTournamentBasicDetails($scope.basicdetails).then(function(res) {
                    $scope.loading = false;
                    if (res.status == global.SUCCESS) {
                        $scope.showSuccessMessage(res.data.message);
                        $scope.init();
                    } else if (res.status == global.FAILURE) {
                        $scope.showErrorMessage(res.error.message);
                    }
                })
            }

        }

        $scope.updateModerators = function() {
            $scope.loading = true;
            var data = {};
            data.docId = $stateParams.id;
            data.moderators = $scope.moderators;
            tournamentsService.saveModerator(data).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.showSuccessMessage(res.data.message);
                } else if (res.status == global.FAILURE) {
                    $scope.showErrorMessage(res.error.message);
                }
            })
        }
        $scope.updateAdditionalInfo = function() {
            $scope.loading = true;
            var data = {};
            data.docId = $stateParams.id;
            data.addlInfo = $scope.addlInfo;
            tournamentsService.updateAdditionalInfo(data).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.showSuccessMessage(res.data.message);
                } else if (res.status == global.FAILURE) {
                    $scope.showErrorMessage(res.error.message);
                }
            })
        }
        $scope.updateCourts = function() {
            $scope.loading = true;
            var data = {};
            data.docId = $stateParams.id;
            data.courts = $scope.selectedCourts;
            tournamentsService.updateCourts(data).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.showSuccessMessage(res.data.message);
                    $scope.init();
                } else if (res.status == global.FAILURE) {
                    $scope.showErrorMessage(res.error.message);
                }
            })
        }



        $scope.updateAccomodationDetails = function() {
            $scope.loading = true;
            var data = {};
            data.docId = $stateParams.id;
            data.accommodations = $scope.accommodations;
            tournamentsService.updateAccomodationDetails(data).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.showSuccessMessage(res.data.message);
                } else if (res.status == global.FAILURE) {
                    $scope.showErrorMessage(res.error.message);
                }
            })
        }
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
        $scope.showModeratorModel = function(ev, moderator, index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({

                    controller: function($scope, moderator, index, $mdDialog) {
                        $scope.moderator = (moderator) ? moderator : {};
                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.save = function(form, moderator) {
                            $scope.submitted = true;
                            $scope.loading = true;
                            if (form.$valid) {
                                var data = {
                                    moderator: moderator,
                                    index: index
                                }
                                $mdDialog.hide(data);
                            }

                        };
                    },
                    templateUrl: 'views/addmoderatormodel.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        moderator: moderator,
                        index: index
                    }
                })
                .then(function(data) {
                    $scope.loading = true;
                    if (data.index != undefined) {
                        $scope.moderators[data.index] = data.moderator;
                    } else {
                        $scope.moderators.push(data.moderator);
                    }
                    $scope.loading = false;
                }, function() {

                });
        };

        $scope.showEventModel = function(ev, event, tournamentDocId) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({

                    controller: function($scope, event, tournamentDocId, $mdDialog, metadataService, association, tournamentsService) {
                        this.openDialog = function() {
                            console.log('dialog opened')
                        }
                        metadataService.getMetadata('SERIES').then(function(res) {
                            $scope.seriesData = res.data.masterData.options;
                        });
                        metadataService.getMetadata('CATEGORY').then(function(res) {
                            $scope.categoryData = res.data.masterData.options;
                        });
                        metadataService.getMetadata('AGE_GROUP').then(function(res) {
                            $scope.ageData = res.data.masterData.options;
                        });

                        association.getAllRegisteredUsers().then(function(res) {
                            if (res.status == 'SUCCESS') {
                                $scope.profiles = res.data.profiles;
                            }
                        })

                        $scope.event = (event) ? event : { tournamentDocId: tournamentDocId };

                        if (event) {
                            $scope.event.signinEndDate = moment(event.signinEndDateTime).format("DD-MMM-YYYY");
                            $scope.event.signinStartDate = moment(event.signinStartDateTime).format("DD-MMM-YYYY");
                            $scope.event.signinEndTime = moment(event.signinEndDateTime).toDate();
                            $scope.event.signinStartTime = moment(event.signinStartDateTime).toDate();
                        }

                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.save = function(form) {
                            $scope.submitted = true;
                            if ($scope.event.eventEndDate < $scope.event.eventStartDate) {
                                $scope.invalidDate = true;
                            }else {
                                $scope.invalidDate = false;
                            }
                            if ($scope.event.signinEndDate < $scope.event.signinStartDate) {
                                $scope.invalidSignDate = true;
                            }else {
                                $scope.invalidSignDate = false;
                            }
                            var endTime = moment($scope.event.signinEndTime).format('HH:mm');
                            var startTime = moment($scope.event.signinStartTime).format('HH:mm');
                            if (endTime < startTime) {
                                $scope.invalidSignTime = true;
                            }else {
                                $scope.invalidSignTime = false;
                            }
                            if (form.$valid) {
                                $scope.loading = true;
                                var event = $scope.event;
                                event.signinEndDateTime = event.signinEndDate + ' ' + moment(event.signinEndTime).format("HH:mm");
                                event.signinStartDateTime = event.signinStartDate + ' ' + moment(event.signinStartTime).format("HH:mm");
                                tournamentsService.saveEvent(event).then(function(res) {
                                        $scope.loading = false;
                                        if (res.status == global.SUCCESS) {
                                            global.showSuccessMessage(res.data.message);
                                            $mdDialog.hide();
                                        } else if (res.status == global.FAILURE) {
                                            global.showErrorMessage(res.error.message)
                                        }

                                    })
                            }

                        };
                    },
                    templateUrl: 'views/add-event.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        event: event,
                        tournamentDocId: $stateParams.id
                    }
                })
                .then(function(data) {
                    getEvents();
                }, function() {

                });
        };
        $scope.showAddlInfoModel = function(ev, addlInfo, index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({

                    controller: function($scope, addlInfo, index, $mdDialog) {
                        $scope.addlInfo = (addlInfo) ? addlInfo : {};
                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.save = function(form, addlInfo) {
                            $scope.submitted = true;
                            if (form.$valid) {
                                var data = {
                                    addlInfo: addlInfo,
                                    index: index
                                }
                                $mdDialog.hide(data);
                            }

                        };
                    },
                    templateUrl: 'views/addaddlInfomodel.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        addlInfo: addlInfo,
                        index: index
                    }
                })
                .then(function(data) {
                    if (data.index != undefined) {
                        $scope.addlInfo[data.index] = data.addlInfo;
                    } else {
                        $scope.addlInfo.push(data.addlInfo);
                    }
                }, function() {

                });
        };

        /*$scope.showCourtModel = function(ev, court, index) {
            $mdDialog.show({

                    controller: function($scope, court, index, venues, $mdDialog, $filter) {
                        $scope.court = (court) ? court : {};
                        $scope.courts = [];
                        $scope.venues = venues;

                        $scope.selectCourt = function(item, list) {
                            var id = item.courtId;
                            var idx = list.indexOf(id);
                            if (idx > -1) {
                                list.splice(idx, 1);
                            } else {
                                list.push(id);
                            }
                        }

                        $scope.exists = function(item, list) {
                            return list.indexOf(item) > -1;
                        };


                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };

                        $scope.courtChange = function() {

                            $scope.selectedVenue = $filter('filter')($scope.venues, { docId: $scope.court.venueDocId })[0];
                        }
                        $scope.save = function(form, court) {
                            $scope.submitted = true;
                            if (form.$valid) {
                                var data = {
                                    court: court,
                                    index: index
                                }
                                $mdDialog.hide(data);
                            }

                        };
                    },
                    templateUrl: 'views/courtsmodel.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        court: court,
                        venues: $scope.tournament.venues,
                        index: index
                    }
                })
                .then(function(data) {
                    if (data.index != undefined) {
                        $scope.courts[data.index] = data.court;
                    } else {
                        $scope.courts.push(data.court);
                    }
                }, function() {

                });
        };*/
        $scope.showAccomidationDetailsModal = function(ev, accommodation, index) {
            $mdDialog.show({

                    controller: function($scope, accommodation, index, $mdDialog) {
                        $scope.accommodation = (accommodation) ? accommodation : {};
                        $scope.update = (index >= 0) ? true : false;
                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.save = function(form, accommodation) {
                            $scope.submitted = true;
                            if (form.$valid) {
                                var data = {
                                    accommodation: accommodation,
                                    index: index
                                }
                                $mdDialog.hide(data);
                            }

                        };
                    },
                    templateUrl: 'views/add-accommodation-model.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        accommodation: accommodation,
                        index: index
                    }
                })
                .then(function(data) {
                    if (data.index != undefined) {
                        $scope.accommodations[data.index] = data.accommodation;
                    } else {
                        $scope.accommodations.push(data.accommodation);
                    }
                }, function() {

                });
        };
    });
