'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:TournamentsCtrl
 * @description
 * # TournamentsCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('TournamentsCtrl', function($scope, tournamentsService, global,$mdDialog) {
        $scope.init = function() {
            $scope.loading = true;
            tournamentsService.getTournaments().then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    $scope.tournaments = res.data.tournaments;
                }

            })
        }
        $scope.init();
        $scope.deleteTournament=function(ev,id){
            $scope.idtoDelete = id;
            var title = 'Alert';
            var textContent = 'Are you sure to delete Tournament?';
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(textContent)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                /*association.deleteAssociation($scope.idtoDelete).then(function(res) {
                    if (res.status == "SUCCESS") {
                        $scope.showSuccessMessage(res.data.message);
                        $state.go($state.current, {}, { reload: true });
                    }
                    else if(res.status=="FAILURE"){
                         if (res.error && res.error.errors) {
                            var errors = res.error.errors;
                            for (var i = errors.length - 1; i >= 0; i--) {
                                $scope.showErrorMessage(errors[i].message);
                            };
                        }
                    }

                });*/

            });
        }
    });
