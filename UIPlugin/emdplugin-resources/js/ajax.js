'use strict';

(function() {

  var app = angular.module('plugin.ajax', []);

  // Set the URL for the request
  app.value('URL', 'http://192.168.3.237:8080/engineManageDomains');

  app.factory('request',['$http', 'URL' function($http, URL){
    return {
      list: function(){
        var httpRequest = $http({
            method: 'GET',
            url: URL + '/domains/'

        }).success(function(data, status) {
            return data;
        });
      }
    };
  }]);

})();