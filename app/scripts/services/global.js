'use strict';

/**
 * @ngdoc service
 * @name proSportsApp.global
 * @description
 * # global
 * Service in the proSportsApp.
 */
angular.module('proSportsApp')
    .service('global', function(envService, $mdToast, localStorageService, $rootScope, $http, $q, $base64) {
        this.defaultTimeout = 30000000;
        this.SUCCESS = "SUCCESS";
        this.FAILURE = "FAILURE";
        this.ERR_CONNECTION_REFUSED = "Unable to connect server";
        this.feedBackChecked = false;
        this.debugmode = envService.read("debugmode");
        this.statusData = ['Active', 'Inactive'];
        this.lights = [{ name: 'YES' }, { name: 'NO' }];
        this.roles = ["ASSOCIATION_ADMIN", "TOUR_ADMIN", "EVENT_ADMIN", "NORMAL_USER", "SUPER_ADMIN"];
        this.showSuccessMessage = function(msg, duration) {
            $mdToast.show($mdToast.simple().textContent(msg || 'Success').position('top right').hideDelay(duration || 3000).theme('success-toast'));
        }
        this.showErrorMessage = function(msg, duration) {
            $mdToast.show($mdToast.simple().textContent(msg || 'Error').position('top right').hideDelay(duration || 3000).theme('error-toast'));
        }
        this.setBadRequest = function() {
            $rootScope.$emit('badRequest', "ok");
        }
        this.invalidApiToken = function() {
            $rootScope.$emit('invalidApiToken', "ok");
        }

        this.init = function() {
            this.apiToken = "";
            this.userId = "";
            this.authentication = null;
            this.userId = null;
            var data = this.getLocalItem("authentication", true);
            if (data) {
                this.authentication = data.data;
                this.apiToken = data.data.apiToken;
                this.userId = data.data.registrationDocId;
                this.roles = data.data.roles;
                for (var i = data.data.roles.length - 1; i >= 0; i--) {
                    this[data.data.roles[i]] = true;
                }
            }
        }

        this.staticUrl = envService.read("staticUrl");
        this.apiUrl = envService.read("apiUrl");
        this.restApi = envService.read("restApi");

        this.setLanguage = function(lng) {
            localStorageService.set("lng", lng);
            this.translate();
        }
        this.setLocalItem = function(key, value, encoded) {
            value = JSON.stringify(value);
            if (encoded) {
                value = $base64.encode(value)
            }
            localStorageService.set(key, value);
        }
        this.removeLocalItem = function(key) {
            localStorageService.remove(key);
        }
        this.getLocalItem = function(key, decoded) {
            var value = localStorageService.get(key);
            value = (value) ? JSON.parse((decoded) ? $base64.decode(value) : value) : null;
            return value;
        }
        this.getLanguage = function() {
            localStorageService.get("lng");
        }

        this.getAuthorization = function() {
            var authorization = {
                    'Authorization': 'Basic' + this.apiToken,
                    'Client-Type': 'WEB',
                    'App-Id': 'PROSPORTS'
                }
                //console.log(authorization);
            return authorization;
        }
        this.getLoginAuthorization = function(val) {
            val = $base64.encode(val);
            var authorization = {
                'Authorization': 'Basic' + val,
                'Client-Type': 'WEB',
                'App-Id': 'PROSPORTS'
            }
            return authorization;
        }
        this.getApiUrl = function() {
            return this.apiUrl;
        }
        this.getApiObject = function() {
            return this.restApi;
        }
        this.getLatlngByGeolocation = function(geolocation) {
            var obj = {};
            var geometry = geolocation.geometry;
            obj.lat = geometry.location.lat();
            obj.lng = geometry.location.lng();

            return obj;
        }
        this.getAddressObj = function(geolocation) {
            var address = {};
            var geometry = geolocation.geometry;
            address.latitude = geometry.location.lat();
            address.longitude = geometry.location.lng();
            for (var i = geolocation.address_components.length - 1; i >= 0; i--) {
                if (geolocation.address_components[i].types[0] == "locality") {
                    address.locality = geolocation.address_components[i].long_name;
                }
                if (geolocation.address_components[i].types[0] == "administrative_area_level_1") {
                    address.state = geolocation.address_components[i].long_name;
                }
                if (geolocation.address_components[i].types[0] == "country") {
                    address.country = geolocation.address_components[i].long_name;
                }
                if (geolocation.address_components[i].types[0] == "postal_code") {
                    address.postalCode = geolocation.address_components[i].long_name;
                }
            };

            return address;
        }
        this.getLocationByLatLng = function(latlng) {
            var deffered = $q.defer();
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({
                'location': latlng
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    deffered.resolve(results[0]);
                } else {
                    deffered.reject("unable to find location");
                }
            });
            return deffered.promise;
        }
        this.getGeocode = function(latLng) {
            var deffered = $q.defer();
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({
                'location': latLng
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    deffered.resolve(results[0]);
                } else {
                    deffered.reject("unable to find location");
                }
            });
            return deffered.promise;
        }

        this.formateGeoCode = function(position) {
            var address = {};
            address.latitude = position[0].position.lat;
            address.longitude = position[0].position.lng;
            for (var i = position.length - 1; i >= 0; i--) {
                if (geolocation.address_components[i].types[0] == "locality") {
                    address.locality = geolocation.address_components[i].long_name;
                }
                if (geolocation.address_components[i].types[0] == "administrative_area_level_1") {
                    address.state = geolocation.address_components[i].long_name;
                }
                if (geolocation.address_components[i].types[0] == "country") {
                    address.country = geolocation.address_components[i].long_name;
                }
                if (geolocation.address_components[i].types[0] == "postal_code") {
                    address.postalCode = geolocation.address_components[i].long_name;
                }
            };
        }
        this.objToQueryString = function(obj) {
            var k = Object.keys(obj);
            var s = "";
            for (var i = 0; i < k.length; i++) {
                s += k[i] + "=" + encodeURIComponent(obj[k[i]]);
                if (i != k.length - 1) s += "&";
            }
            return s;
        };

        this.init();
        $rootScope.getImageFileById = this.getApiUrl() + this.getApiObject().getImageFileById;

    });
