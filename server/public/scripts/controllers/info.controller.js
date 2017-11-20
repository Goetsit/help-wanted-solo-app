myApp.controller('InfoController', function($http,UserService,$mdDialog) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.resources=[];
  

  
   
  vm.getResources = function(){
    $http.get('/info').then(function (response) {
        console.log('Success!');
        vm.resources = response.data;
    }).catch(function (error) {
        console.log('Failure!', error);
    });
}

  vm.getResources();


  
  
  vm.resourceAlert = function(ev, resource) {
    console.log('dialog box');
  //  console.log(index, 'index?');
    console.log('resource?', resource);
    $mdDialog.show({
      controller: 'InfoController',
      templateUrl: 'views/templates/resourceDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
  }



vm.bookmark = function(index){
  console.log(vm.resources[index].resourceid,'on bookmark, resourceid');
  $http.post('/info/bookmark',vm.resources[index]).then(function(response){
    console.log('success!');
  }).catch(function(error){
    console.log('failure');
  })
}

});
