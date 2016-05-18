'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:AssociationsCtrl
 * @description
 * # AssociationsCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('AssociationsCtrl', function($scope, ngTableParams, $state, association, global, $mdDialog) {
        $scope.loading = true;
        association.getAllAssociations(global.userId).then(function(res) {
            $scope.loading = false;
            if (res.status == 'SUCCESS') {
                if (res.data.associations.length > 0) {
                    $scope.associationList = res.data.associations;
                } else {
                    $scope.associationsErr = 'No Associations Found.';
                }

            }


        }, function(err) {
            $scope.loading = false;
            $scope.loginError = global.ERR_CONNECTION_REFUSED;
            $scope.associationsErr = "Server Not Responding. Try again!";

        });




        $scope.showConfirm = function(ev, id) {
            $scope.idtoDelete = id;
            var title = 'Alert';
            var textContent = 'Are you sure to delete association?';
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(textContent)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                association.deleteAssociation($scope.idtoDelete).then(function(res) {
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

                });

            });
        };

        $scope.deleteAssociation = function(id) {
            $scope.idtoDelete = id;


        };



        $scope.current = $state.$current;

        if ($scope.current.url.sourcePath == '/associations') {
            $('#loginID').hide();
            $('#logoutID').show();
        }
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            filter: { name: "T" }
        }, {
            getData: function($defer, params) {
                var receiveData = function(data, responseHeaders) {
                    params.total(4);
                    $defer.resolve(data);
                };
                $defer.resolve($scope.associationList);
                params.settings({ counts: $scope.associationList.length > 10 ? [] : [] });
            }
        });
    });
