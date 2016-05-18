'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('RegisterCtrl', function($scope,$state,global,authentication,$filter) {
        // var date = new Date();
        // $scope.currentDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        // $scope.vDate = "12-Apr-2016";
        $scope.maxDateRange="31-Dec-2010";
        $scope.gotoDate=new Date(2010, 1);
        $scope.YearRange=[1947,2010];
        
        // $scope.myPickerObject.setMaxDate(new Date( '01/01/2016' ));
        
        // moment().subtract(1, 'year').format('dd-MMM-yyyy');
        // moment().format('MMMM Do YYYY, h:mm:ss a');
        // console.log($scope.currentDate);
        // $scope.dob={format:'dd-MMMM-yyyy'}
        $scope.submit = function(form) {
            $scope.submitted = true;
            if ($scope.registrationForm.$valid) {
                $scope.loading=true;
                $scope.data.registerType="self";
                $scope.data.userType="user";
                global.setLocalItem("registration",$scope.data,true);
                authentication.register($scope.data).then(function(res) {
                    $scope.cfdump = res;
                    if (res.status == global.SUCCESS) {
                        $state.go('root.otp', {
                            queryParams: $scope.data
                        })
                    } else if (res.status == global.FAILURE) {
                      global.showErrorMessage(res.error.message);
                    }
                });
            } else {
            }
        }
    });
