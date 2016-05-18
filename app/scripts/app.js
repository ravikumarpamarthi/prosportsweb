'use strict';

/**
 * @ngdoc overview
 * @name proSportsApp
 * @description
 * # proSportsApp
 *
 * Main module of the application.
 */
angular
    .module('proSportsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.router',
        'ngSanitize',
        'angular.mdl',
        'ml.menu',
        'ml.svg-map',
        'ml.todo',
        'ui.select', // Enhanced select element
        'ui.select2',
        'ngFileUpload', // File uploader
        'ngWig', // Text editor
        'pikaday', // Datepicker
        'ngPlaceholders',
        'ngTable',
        'LocalStorageModule',
        'ngMaterial',
        'ngMaterialDatePicker',
        'ngMessages',
        'environment',
        'base64',
        'google.places',
        'mdPickers',
        'dndLists'


    ])

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider, envServiceProvider, pikadayConfigProvider, $mdThemingProvider) {

    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("error-toast");

    pikadayConfigProvider.setConfig({
        format: "MM/DD/YYYY"
    });
    localStorageServiceProvider.setPrefix('proSportsApp')
        .setStorageType('localStorage')
        .setNotify(true, true);
    var restApi = {
        sportType: "/api/masterdata/:key",

        updateProfile: "/api/consumer/profile",
        logout: "/api/auth/logout",

        getAllSports: "/data/retrieveAllSports",

        getImageFileById: "/fileManager/getImageFileById",
        forgotpassword: "/api/registration/:usertext/reset/pwd",


        deleteAssociation: "/api/association/:associd/delete",
        imageUpload: "/fileManager/uploadFile",
        addCourt: "/api/venue/:venueId/court",



        getProfile: "/api/registration/:id",
        getAllRegisteredUsers: "/api/registrations",
        signup: "/api/registration",
        otpVerification: "/api/registration/verification",
        resetPwd: "/api/registration/pwd",
        login: "/api/auth/login",
        addVenue: "/api/venue",
        updateVenue: "/api/venue",
        getVenue: "/api/venue/{venueId}",
        getAllVenues: "/api/venues",
        updateAssociationOwner: "/api/association",
        createAssociation: "/api/association",
        getAllAssociations: "/api/associations",
        getAssociation: "/api/association/:associd",
        updateAssociationAllFields: "/api/association/{docId}/other",
        updateProfile: "/api/myaccount/:id",
        getTournaments: "/api/tournaments",
        saveTournament: "/api/tournament",
        updateTournamentBasicDetails: "/api/tournament/basicdetails",
        getTournament: "/api/tournament/{id}",
        saveModerator: "/api/tournament/moderators",
        updateAdditionalInfo: "/api/tournament/info",
        updateCourts: "/api/tournament/courts",
        getTournamentCourts: "/api/tournament/{tournamentDocId}/courts",
        updateAccomodationDetails: "/api/tournament/accommodations",
        getMetadata: "/api/masterdata/{key}",
        getEvents: "/api/events?tournamentdocid={tournamentdocid}",
        saveEvent: "/api/event",
        getAsignedEvents: "/api/events?admindocid={userId}",
        userSearch: "/api/user?mobileoremail={mobileOrEmail}",
        userEntry: "/api/entry",
        getEntries: "/api/entries?eventdocid={eventDocId}",
        getRecievedEntries: "/api/entries?eventdocid={eventDocId}&status={status}",
        getDirectEntries: "/api/entries?eventdocid={eventDocId}&draw={draw}",
        updateEntries: "/api/event/{eventDocId}/postplayer",
        getDrawPlayers: "/api/entries/event/{eventDocId}/draw/{draw}",
        publishDraw: "/api/draw",
        getMatches: "/api/matches?eventdocid={eventDocId}&draw={draw}",
        getScheduledMatches: "/api/matches?eventdocid={eventDocId}&status=ALL",
        scheduleMatch: "/api/match/schedule",
        updateScore: "/api/match/score",
        completMatch: "/api/match/completed",
        getDrawMatchResult: "/api/bracket/event/{eventDocId}?draw={draw}",
        getMatchResult: "/api/bracket/event/{eventDocId}",

    };
    var debugmode = false;
    envServiceProvider.config({
        vars: {
            development: {

                apiUrl: 'http://10.80.80.122:9080/prosports',
                // apiUrl: 'http://192.168.101.195:9080/prosports',
                // apiUrl:'http://10.80.80.105:9080/prosports-restcontroller',
                staticUrl: 'http://localhost:9009',
                restApi: restApi,
                debugmode: debugmode

            },
            localhost: {
                apiUrl: 'http://localhost:3000',
                staticUrl: 'http://localhost:3000',
                restApi: restApi,
                debugmode: debugmode
            },
            qaserver: {
                apiUrl: 'http://gss.digitelenetworks.com/prosports',
                // staticUrl: 'http://localhost:9009', //http://gss.digitelenetworks.com',
                staticUrl: 'http://gss.digitelenetworks.com',
                restApi: restApi,
                debugmode: debugmode
            }
        }
    });

    envServiceProvider.check();
    envServiceProvider.set('development');
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state('root', {
            url: '',
            views: {
                "content@": {
                    controller: function($state) {
                        $state.go('root.home');
                    }
                }
                /*,
                                'header': {
                                    templateUrl: "views/header.html",
                                    // controller: "HeaderCtrl"
                                },
                                'aside': {
                                    templateUrl: "views/sidebar.html",
                                    // controller: "HeaderCtrl"
                                }*/
            }
        }).state('root.home', {
            url: "/home",
            views: {
                "content@": {
                    //templateUrl: "views/home.html",
                    //controller: 'MainCtrl'
                    controller: function(global) {
                        window.location = global.staticUrl + '/home';
                    }
                }
            }
        }).state('root.add-venue', {
            url: "/add-venue",
            views: {
                "content@": {
                    templateUrl: "views/add-venue.html",
                    controller: 'AddVenueCtrl'
                }
            }
        }).state('root.associations', {
            url: "/associations",
            views: {
                "content@": {
                    templateUrl: "views/associations.html",
                    controller: 'AssociationsCtrl'
                }
            },
            resolve: {
                "check": function($q, global, $state) {

                    if (global.SUPER_ADMIN != undefined) {
                        return true;
                    } else {
                        return $q.reject("noaccess");
                    }
                }
            }
        })
        .state('root.associationslist', {
            url: "/associationslist",
            views: {
                "content@": {
                    templateUrl: "views/associationslist.html",
                    controller: 'AssociationslistCtrl'
                }
            }
        })
        .state('root.tournaments', {
            url: "/tournaments",
            views: {
                "content@": {
                    templateUrl: "views/tournaments.html",
                    controller: 'TournamentsCtrl'
                }
            }
        }).state('root.dragdrop', {
            url: "/dragdrop",
            views: {
                "content@": {
                    templateUrl: "views/dragdrop.html",
                    controller: 'DragdropCtrl'
                }
            }
        })
        .state('root.leagues', {
            url: "/leagues",
            views: {
                "content@": {
                    templateUrl: "views/leagues.html",
                    controller: 'LeaguesCtrl'
                }
            }
        })
        .state('root.tournamentslist', {
            url: "/tournamentslist",
            views: {
                "content@": {
                    templateUrl: "views/tournamentslist.html",
                    controller: 'TournamentslistCtrl'
                }
            }
        })
        .state('root.createassociation', {
            url: "/createassociation",
            views: {
                "content@": {
                    templateUrl: "views/createassociation.html",
                    controller: 'CreateassociationCtrl'
                }
            }
        })
        .state('root.editassociationowner', {
            url: "/editassociationowner/:associd",
            views: {
                "content@": {
                    templateUrl: "views/editassociationowner.html",
                    controller: 'EditassociationownerCtrl'
                }
            }
        })
        .state('root.editassociation', {
            url: "/editassociation/:associd",
            views: {
                "content@": {
                    templateUrl: "views/editassociation.html",
                    controller: 'EditassociationCtrl'
                }
            }
        })
        .state('root.createtournament', {
            url: "/createtournament",
            views: {
                "content@": {
                    templateUrl: "views/createtournament.html",
                    controller: 'CreatetournamentCtrl'
                }
            }
        })
        .state('root.edittournament', {
            url: "/edittournament/:id",
            views: {
                "content@": {
                    templateUrl: "views/edittournament.html",
                    controller: 'EdittournamentCtrl'
                }
            }
        })
        .state('root.registertournament', {
            url: "/registertournament",
            views: {
                "content@": {
                    templateUrl: "views/registertournament.html",
                    controller: 'RegistertournamentCtrl'
                }
            }
        })
        .state('root.viewtournament', {
            url: "/viewtournament",
            views: {
                "content@": {
                    templateUrl: "views/viewtournament.html",
                    controller: 'ViewtournamentCtrl'
                }
            }
        }).state('root.eventadmin', {
            url: "/eventadmin",
            views: {
                "content@": {
                    templateUrl: "views/eventadmin.html",
                    controller: 'EventadminCtrl'
                }
            }
        }).state('root.login', {
            url: "/login",
            views: {
                "content@": {
                    templateUrl: "views/login.html",
                    controller: 'LoginCtrl'
                }
            }
        }).state('root.register', {
            url: "/register",
            views: {
                "content@": {
                    templateUrl: "views/register.html",
                    controller: 'RegisterCtrl'
                }
            }
        }).state('root.forgotpassword', {
            url: "/forgotpassword",
            views: {
                "content@": {
                    templateUrl: "views/forgotpassword.html",
                    controller: 'ForgotpasswordCtrl'
                }
            }
        })
        .state('root.myaccount', {
            url: "/myaccount",
            views: {
                "content@": {
                    templateUrl: "views/myaccount.html",
                    controller: 'MyaccountCtrl'
                }
            }
        })
        .state('root.sporting-venue', {
            url: "/sporting-venue",
            views: {
                "content@": {
                    templateUrl: "views/sporting-venue.html",
                    controller: 'SportingVenueCtrl'
                }
            }
        })
        .state('root.edit-sporting-venue', {
            url: "/edit-sporting-venue/:id",
            views: {
                "content@": {
                    templateUrl: "views/edit-sporting-venue.html",
                    controller: 'EditSportingVenueCtrl'
                }
            }
        })
        .state('root.otp', {
            url: "/otp",
            params: {
                queryParams: null
            },
            views: {
                "content@": {
                    templateUrl: "views/otp.html",
                    controller: 'OtpCtrl'
                }
            }
        }).state('root.player-preparation', {
            url: "/player-preparation/:eventdocid/:tournamentDocId/:teamsize",

            views: {
                "content@": {
                    templateUrl: "views/postplayerschedule.html",
                    controller: 'PostPlayerScheduleCtrl'
                }
            }
        }).state('root.eventdetails', {
            url: "/event-details/:eventId",

            views: {
                "content@": {
                    templateUrl: "views/eventdetails.html",
                    controller: 'EventDetailsModalCtrl'
                }
            }
        })

}).directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
}).run(function($state, global, $log, $rootScope, $timeout) {

    $rootScope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
            var element = document.querySelector('.mdl-layout');
            // This will make sure the MaterialLayout isn't initialized
            // on page load so we can do it manually
            element.classList.add('mdl-js-layout');
            componentHandler.upgradeElement(element, 'MaterialLayout');
        });
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === "noaccess") {
            $state.go("viewtournament");
        }
    });
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        var isLogin = toState.name === 'root.login';
        global.init();

        if (isLogin) {
            global.removeLocalItem("authentication");
            global.removeLocalItem("sellReuestItems");
            global.removeLocalItem("registration");
            return;
        } else {
            var toStateName = toState.name;
            if (
                // toStateName == 'root.associations' ||
                // toStateName == 'root.associationslist' ||
                // toStateName == 'root.createassociation' ||
                // toStateName == 'root.editassociationowner' ||
                // toStateName == 'root.editassociation' ||
                // toStateName == 'root.tournaments' ||
                // toStateName == 'root.tournamentslist' ||
                // toStateName == 'root.createtournament' ||
                // toStateName == 'root.edittournament' ||
                // toStateName == 'root.eventadmin' ||
                // toStateName == 'root.courtadmin' ||
                // toStateName == 'root.viewtournament' ||
                // toStateName == 'root.registertournament' ||
                // toStateName == 'root.myaccount' ||

                toStateName == 'root.otp' ||
                toStateName == 'root.register' ||
                toStateName == 'root.forgotpassword' ||
                toStateName == 'root.login' ||
                toStateName == 'root.home'
            ) {
                return;
            }
            if (global.authentication == null || global.authentication == undefined || global.authentication == '') {
                e.preventDefault();
                $state.go('root.home');
                return;
            }


        }
    });
}).filter('customNumber', function(){
      return function(input, size) {
        var zero = (size ? size : 4) - input.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + input;
      }
  });
