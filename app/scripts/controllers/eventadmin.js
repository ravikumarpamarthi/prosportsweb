'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:EventadminCtrl
 * @description
 * # EventadminCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('EventadminCtrl', function($scope,global,tournamentsService,ngTableParams, $mdDialog, $mdMedia, $state) {
    $scope.loading = true;
     tournamentsService.getAsignedEvents().then(function(res){
     	$scope.loading = false;
        if(res.status==global.SUCCESS){
            $scope.events=res.data.events;
        }else{
            $scope.showErrorMessage(res.error.message);
        }

     })
    });