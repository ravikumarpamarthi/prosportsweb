'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:DragdropCtrl
 * @description
 * # DragdropCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('DragdropCtrl', function($scope,$mdDialog) {
        $scope.lists = [{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        },{
            label: "Player1",
            allowedTypes: ['player'],
            max: 1,
            people: [

            ]
        }, {
            label: "Player2",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Player3",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Player4",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Player5",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Player6",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Player7",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Player8",
            allowedTypes: ['player'],
            max: 1,
            people: []
        }, {
            label: "Players",
            allowedTypes: ['player'],
            max: 16,
            people: [
                { name: "Munikirshna Reddy C", type: "player" },
                { name: "Meher Srinivas M", type: "player" },
                { name: "K MEHER SRINIVAS", type: "player" },
                { name: "GURU PRASAD", type: "player" },
                { name: "ARUN NICHANI", type: "player" },
                { name: "AJAY KAMAT", type: "player" },
                { name: "J C VENKATESH", type: "player" },
                { name: "SHASHI KUMAR", type: "player" },{ name: "Munikirshna Reddy C", type: "player" },
                { name: "Meher Srinivas M", type: "player" },
                { name: "K MEHER SRINIVAS", type: "player" },
                { name: "GURU PRASAD", type: "player" },
                { name: "ARUN NICHANI", type: "player" },
                { name: "AJAY KAMAT", type: "player" },
                { name: "J C VENKATESH", type: "player" },
                { name: "SHASHI KUMAR", type: "player" }
               
            ]
        }];

        $scope.$watch('lists', function(lists) {
            $scope.modelAsJson = angular.toJson(lists, true);
        }, true);

        

    });
