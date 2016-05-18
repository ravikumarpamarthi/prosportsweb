'use strict';

/**
 * @ngdoc directive
 * @name proSportsApp.directive:mlSidebar
 * @description
 * # mlSidebar
 */
angular.module('proSportsApp')
  .directive('mlSidebar', function () {
    return {
      templateUrl: 'views/sidebar.html',
      restrict: 'E',
      replace: true
    };
  });
