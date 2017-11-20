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

/*

vm.bookmark = function(index){
  console.log(vm.resources[index].resourceid,'on bookmark, resourceid');
  $http.post('/info/bookmark',vm.resources[index]).then(function(response){
    console.log('success!');
  }).catch(function(error){
    console.log('failure');
  })
}
*/


vm.removeBookmarked = function(index){
  console.log(vm.bookmarked[index].resourceid,'on remove bookmark');
  $http.delete('/user/bookmark/delete').then(function (response) {
      console.log('Success!');
      vm.bookmarked = response.data;
  }).catch(function (error) {
      console.log('Failure!', error);
  }); 

}

});
