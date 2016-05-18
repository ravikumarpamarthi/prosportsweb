'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:MainControllerCtrl
 * @description
 * # MainControllerCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('MainController', function($scope, $state, $mdToast, global) {
        $scope.onPikadaySelect = function onPikadaySelect(pikaday, date) {
            var event = new Event('input');
            pikaday._o.field.dispatchEvent(event);
        };

        $scope.pageTitle;

        $scope.setPageTile = function(title) {
            $scope.pageTitle = title;
        }

        $scope.go = function(state, params) {
            $state.go(state, params);
        }

        $scope.showSuccessMessage = function(msg, duration) {
            $mdToast.show($mdToast.simple().textContent(msg || 'Success').position('top right').hideDelay(duration || 3000).theme('success-toast'));
        }
        $scope.showErrorMessage = function(msg, duration) {
            $mdToast.show($mdToast.simple().textContent(msg || 'Error').position('top right').hideDelay(duration || 3000).theme('error-toast'));
        }
        $scope.initauthentication = function() {
            $scope.authentication = global.authentication;
            $scope.roles = global.roles;
            assignPermissions();
        }

        function assignPermissions(){
           for (var i = $scope.roles.length - 1; i >= 0; i--) {
               $scope[$scope.roles[i]]=true;
           }
        }

        $scope.$on('initauthentication', function(event, data) {
            global.init();
            $scope.initauthentication();
        });
        $scope.initauthentication();
  

        $scope.checkPermission=function(){

        }

    });
