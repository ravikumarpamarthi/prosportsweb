'use strict';

/**
 * @ngdoc directive
 * @name proSportsApp.directive:mlHeader
 * @description
 * # mlHeader
 */
angular.module('proSportsApp')
  .directive('mlHeader', function () {
    return {
      templateUrl: 'views/header.html',
      restrict: 'E',
      replace: true
    };
  });
