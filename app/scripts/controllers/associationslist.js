'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:AssociationslistCtrl
 * @description
 * # AssociationslistCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('AssociationslistCtrl', function($scope, ngTableParams, $state, association, global) {
        $scope.loading = true;
        association.getAllAssociations(global.userId).then(function(res) {
            //console.log(res.data);
            $scope.loading = false;
            if (res.status == 'SUCCESS') {
                if (res.data.associations.length > 0) {
                    $scope.associationList = res.data.associations;
                } else {
                    console.log("No Records Found");
                }

            }


        }, function(err) {
            $scope.loginError = global.ERR_CONNECTION_REFUSED;

        });
        $scope.current = $state.$current;

        if ($scope.current.url.sourcePath == '/associationslist') {
            $('#loginID').hide();
            $('#logoutID').show();
        }
 /*       $scope.associationList = [
            { firstname: 'Asian Tennis Federation (ATF)', sportType: 'Tennis', associationID: 'ATF191905', entryTime: '10:40 A.M', points: '4.5', mean: '2', registered: 'Yes', mainDrawQualified: 'Yes' },
            { firstname: 'Confederation of African Tennis (CAT)', sportType: 'Tennis', associationID: 'CAT194705', entryTime: '12:15 P.M', points: '3.5', mean: '6', registered: 'No', mainDrawQualified: 'No' },
            { firstname: 'Tennis Europe (TE)', sportType: 'Tennis', associationID: 'TE195005', entryTime: '4:40 P.M', points: '6.5', mean: '7', registered: 'Yes', mainDrawQualified: 'No' },
        ];*/


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
