'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:TournamentsCtrl
 * @description
 * # TournamentsCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('LeaguesCtrl', function($scope, ngTableParams, $state) {
        $scope.current = $state.$current;

        if ($scope.current.url.sourcePath == '/tournaments') {
            $('#loginID').hide();
            $('#logoutID').show();
        }

        $scope.associationList = [
            { firstname: 'WIMBLEDON-2016', associationName: 'All-England Club', sportType: 'Tennis', entryTime: '10:40 A.M', points: '4.5', mean: '2', registered: 'Yes', mainDrawQualified: 'Yes' },
            { firstname: 'FRENCH OPEN-2016', associationName: 'Internationaux de France de Tennis', sportType: 'Tennis', entryTime: '12:15 P.M', points: '3.5', mean: '6', registered: 'No', mainDrawQualified: 'No' },
            { firstname: 'US OPEN-2016', associationName: 'United States Tennis Association', sportType: 'Tennis', entryTime: '4:40 P.M', points: '6.5', mean: '7', registered: 'Yes', mainDrawQualified: 'No' },
        ];

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            filter: { name: "T" }
        }, {
            getData: function($defer, params) {
                var receiveData = function(data, responseHeaders) {

                    params.total(4);


                    $defer.resolve(data);
                    //data.length>10?[]:[];

                };


                $defer.resolve($scope.associationList);
                params.settings({ counts: $scope.associationList.length > 10 ? [] : [] });
            }
        });
    });
