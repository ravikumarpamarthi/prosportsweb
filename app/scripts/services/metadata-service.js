'use strict';

/**
 * @ngdoc service
 * @name proSportsApp.metadataService
 * @description
 * # metadataService
 * Service in the proSportsApp.
 */
angular.module('proSportsApp')
    .factory('metadataService', function(global, httpService) {
        return {
            getMetadata: function(key) {
                var url = global.getApiUrl() + global.getApiObject().getMetadata.replace('{key}',key);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
        }
    });
