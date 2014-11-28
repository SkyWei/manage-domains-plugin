'use strict';

// Use in the modal to add a new domain

(function() {

  var app = angular.module('plugin.add', ['plugin.common', 'plugin.ajax', 'plugin.translations']);

  app.value('dialogName', 'add-dialog');

  app.run(['messager', 'dialogName', function (messager, dialogName) {

    messager.sendActionMessage(dialogName, 'justOpen', null);
  }]);

   app.controller('AddFormController',['$scope', '$window', 'messager', 'dialogName', 'request', 'translationService', function($scope, $window, messager, dialogName, request, translationService){

     translationService.getTranslation($scope);

     $scope.domain ={"domain": "",
                     "provider": "",
                     "user": "",
                     "addPermissions": false,
                     "configFile": "",
                     "ldapServers": "",
                     "resolveKdc": false,
                     "passwordFile": ""
                    };



      $scope.toggleLoadingModal = function() {
        $scope.modalShown = !$scope.modalShown;
        $scope.$apply();
      };

      $scope.modalShown = false;

     $scope.submit = function() {
        // First verify the form
        if($scope.addForm.$valid){

          $scope.toggleLoadingModal();

          console.log('[EMDPlugin > add.js > AddFormController]' + '\n' + '--> The form is valid.');

          // Test if the domain object is define
          if($scope.domain){
             var domainJSON = angular.toJson($scope.domain);
            console.log('[EMDPlugin > add.js > AddFormController]' + '\n' + '--> Information from the form ' + angular.toJson($scope.domain));

            request.add($scope.domain);

          }
        } else {
           $window.alert("Domain, Provider, User and PasswordFile are requiered input. Please fill them correctly !");
        }

      };
   }]);

   // Allow the chevron to change state when the Advanced Parameters are collapsed or not.
   app.controller('collapseWatcher', ['$scope', function($scope) {
      $scope.showAdvParam = false;

      $scope.actCollapse = function(state) {
         $scope.showAdvParam = !state;
      };
   }]);

})();
