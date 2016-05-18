'use strict';

/**
 * @ngdoc service
 * @name proSportsApp.tournamentsService
 * @description
 * # tournamentsService
 * Service in the proSportsApp.
 */
angular.module('proSportsApp')
    .factory('tournamentsService', function(global, httpService) {
        return {
            getTournaments: function() {
                var url = global.getApiUrl() + global.getApiObject().getTournaments;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
             getMatches: function(eventDocId,draw) {
                var url = global.getApiUrl() + global.getApiObject().getMatches.replace("{eventDocId}",eventDocId).replace("{draw}",draw);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            }, 
            getMatchResult: function(eventDocId,draw) {
                var url = global.getApiUrl() + global.getApiObject().getMatchResult.replace("{eventDocId}",eventDocId).replace("{draw}",draw);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getDrawMatchResult: function(eventDocId,draw) {
                var url = global.getApiUrl() + global.getApiObject().getDrawMatchResult.replace("{eventDocId}",eventDocId).replace("{draw}",draw);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },getScheduledMatches: function(eventDocId) {
                var url = global.getApiUrl() + global.getApiObject().getScheduledMatches.replace("{eventDocId}",eventDocId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
             getTournamentCourts: function(tournamentDocId) {
                var url = global.getApiUrl() + global.getApiObject().getTournamentCourts.replace("{tournamentDocId}",tournamentDocId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
             getDrawPlayers: function(eventDocId,draw) {
                var url = global.getApiUrl() + global.getApiObject().getDrawPlayers.replace("{eventDocId}",eventDocId).replace("{draw}",draw);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
             getEntries: function(eventDocId) {
                var url = global.getApiUrl() + global.getApiObject().getEntries.replace("{eventDocId}",eventDocId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getRecievedEntries: function(eventDocId,status) {
                var url = global.getApiUrl() + global.getApiObject().getRecievedEntries.replace("{eventDocId}",eventDocId).replace("{status}",status);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },getDirectEntries: function(eventDocId,draw) {
                var url = global.getApiUrl() + global.getApiObject().getDirectEntries.replace("{eventDocId}",eventDocId).replace("{draw}",draw);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
             getEntries: function(eventDocId) {
                var url = global.getApiUrl() + global.getApiObject().getEntries.replace("{eventDocId}",eventDocId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getEvents: function(id) {
                var url = global.getApiUrl() + global.getApiObject().getEvents.replace('{tournamentdocid}',id);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getAsignedEvents: function() {
                var userId=global.userId;
                var url = global.getApiUrl() + global.getApiObject().getAsignedEvents.replace('{userId}',userId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            saveModerator: function(data) {
                var url = global.getApiUrl() + global.getApiObject().saveModerator;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            updateScore: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateScore;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            completMatch: function(data) {
                var url = global.getApiUrl() + global.getApiObject().completMatch;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            scheduleMatch: function(data) {
                var url = global.getApiUrl() + global.getApiObject().scheduleMatch;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            publishDraw: function(data) {
                var url = global.getApiUrl() + global.getApiObject().publishDraw;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            updateEntries: function(data,eventDocId) {
                var url = global.getApiUrl() + global.getApiObject().updateEntries.replace("{eventDocId}",eventDocId);
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            }, 
            getTournament: function(id) {
                var url = global.getApiUrl() + global.getApiObject().getTournament.replace('{id}',id);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            saveTournament: function(data) {
                var url = global.getApiUrl() + global.getApiObject().saveTournament;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            updateTournamentBasicDetails: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateTournamentBasicDetails;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            updateAdditionalInfo: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateAdditionalInfo;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            updateCourts: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateCourts;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            updateAccomodationDetails: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateAccomodationDetails;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            saveEvent: function(data) {
                var url = global.getApiUrl() + global.getApiObject().saveEvent;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            }
        }
    });
