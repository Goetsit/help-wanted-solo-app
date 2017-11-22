myApp.controller('UserController', function($http,UserService, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.bookmarked = [];
  vm.userInfo= [];

   
  vm.getBookmarked = function(){
    $http.get('/user/bookmark').then(function (response) {
        console.log('Success!');
        vm.bookmarked = response.data;
    }).catch(function (error) {
        console.log('Failure!', error);
    });
  
}

vm.getBookmarked();


vm.removeBookmarked = function(index){
  console.log(vm.bookmarked[index].resourceid,'on remove bookmark');
  var id = vm.bookmarked[index].resourceid
  $http.delete('/user/bookmark/'+ id).then(function (response) {
      console.log('Successfully deleted');
      vm.getBookmarked();
  }).catch(function (error) {
      console.log('Failure on delete', error);
  }); 

}

vm.getUserInfo = function(user){
  $http.get('/user/userinfo').then(function (response) {
    console.log('Success!');
    vm.userInfo = response.data;
    console.log(vm.userInfo,'userinfo');
}).catch(function (error) {
    console.log('Failure!', error);
});
}

vm.getUserInfo();


vm.userAlert = function(ev) {
  console.log('dialog box');
  $mdDialog.show({
    controller: 'UserController',
    templateUrl: 'views/templates/userDialog.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true
  })
}

vm.newResource = function(newR){
        console.log(newR, 'adding new resource');
       //should be able to get enteredbyuserid from req.user.userid
}

vm.newResourceAlert = function(ev) {
    console.log('dialog box');
    $mdDialog.show({
      controller: 'UserController as uc',
      templateUrl: 'views/templates/new.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
  }

});
