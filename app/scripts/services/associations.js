'use strict';


angular.module('proSportsApp')
    .factory('association', function(global, httpService) {
        return {
            create: function(data) {
                var url = global.getApiUrl() + global.getApiObject().createAssociation;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            updateAssociationOwner: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateAssociationOwner;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            createAssociation: function(data) {
                var url = global.getApiUrl() + global.getApiObject().createAssociation;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            updateAssociationAllFields: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateAssociationAllFields.replace("{docId}", data.docId);
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            getAssociation: function(id) {

                var url = global.getApiUrl() + global.getApiObject().getAssociation.replace(":associd", id);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getAllAssociations: function(id, sport) {
                var params = '';
                if (global.role != 'admin') {
                    var params = {};
                    params.admindocid = id;
                    //params.typ
                    var params = "?" + global.objToQueryString(params);
                }


                var url = global.getApiUrl() + global.getApiObject().getAllAssociations + params;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            deleteAssociation: function(id) {
                var url = global.getApiUrl() + global.getApiObject().deleteAssociation.replace(":associd", id);
                var $request = httpService.httpRequest(url, "P");
                return $request;
            },
            addVenue: function(data) {
                var url = global.getApiUrl() + global.getApiObject().addVenue;

                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            updateVenue: function(data) {
                var url = global.getApiUrl() + global.getApiObject().updateVenue;

                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            addCourt: function(data) {
                var url = global.getApiUrl() + global.getApiObject().addCourt.replace(":venueId", data.venueDocId);
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            getAllVenues: function() {
                var url = global.getApiUrl() + global.getApiObject().getAllVenues;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getVenue: function(venueId) {
                var url = global.getApiUrl() + global.getApiObject().getVenue.replace("{venueId}", venueId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getAllRegisteredUsers: function() {
                var url = global.getApiUrl() + global.getApiObject().getAllRegisteredUsers;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getAllSports: function() {
                var url = global.getApiUrl() + global.getApiObject().getAllSports;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            }
        };
    });
