// myApp.controller('Dialogcontroller', function($http,UserService,$mdDialog, variableName) {
myApp.controller('InfoController', function($http,UserService,$mdDialog) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.resources=[];
 // vm.resource=[];

  
   
  vm.getResources = function(){
    $http.get('/info').then(function (response) {
        console.log('Success!');
        vm.resources = response.data;
    }).catch(function (error) {
        console.log('Failure!', error);
    });
}

  vm.getResources();

 

vm.bookmark = function(index){
  console.log(vm.resources[index].resourceid,'on bookmark, resourceid');
  $http.post('/info/bookmark',vm.resources[index]).then(function(response){
    console.log('success!');
  }).catch(function(error){
    console.log('failure');
  })
}


vm.recommend = function(index){
  console.log(vm.resources[index].resourceid, 'on recommend, resourceid');
  $http.put('/info/recommend/'+ vm.resources[index].resourceid).then(function(response){
    vm.getResources();
    console.log('success!');
  }).catch(function(error){
    console.log('failure');
  })
}

vm.searchResources = function(text){
  console.log(text);
  console.log('search');
}

/*
  
  vm.resourceAlert = function(ev) {
   console.log('console on resource alert', vm.resource)
    $mdDialog.show({
      controller: 'InfoController as info',
      templateUrl: 'views/templates/resourceDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      resolve: function() {
        return vm.resource;    
      }
    }
    )
    console.log('HELLO WORLD');
  }

 vm.getSingleResource = function(event, resource){

  console.log(resource.resourceid,'hello');
   $http.get('/info/'+ resource.resourceid).then(function (response) {
        console.log('Success!');
        vm.resource = response.data;
        console.log(vm.resource,'vm.resource');
        vm.resourceAlert(event);
    }).catch(function (error) {
        console.log('Failure!', error);
    }); 
}
  


*/

});
