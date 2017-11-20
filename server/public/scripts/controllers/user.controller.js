myApp.controller('UserController', function($http,UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.bookmarked = [];


   
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

});
