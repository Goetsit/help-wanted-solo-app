myApp.controller('InfoController', function(UserService,$mdDialog) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;

  vm.resourceAlert = function(ev) {
    console.log('dialog box');
    $mdDialog.show({
      controller: 'InfoController',
      templateUrl: 'views/templates/resourceDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
  }


});
