// myApp.controller('Dialogcontroller', function($http,UserService,$mdDialog, variableName) {
myApp.controller('InfoController', function ($http, UserService, $mdDialog, NgMap) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.resources = [];
  vm.resourceTest = vm.userService;

  /*  Initial GET request to populate Resource tab  */
  vm.getResources = function () {
    $http.get('/info').then(function (response) {
      vm.resources = response.data;
    }).catch(function (error) {
      console.log('Failure!', error);
    });
  } //END GET

  vm.getResources();  //Call GET to populate page

  /* MdDialog  set up for error when inserting duplicate bookmarks  */
  vm.bookmarkAlertError = function (ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error when bookmarking')
        .textContent('I am glad you like this resource, but you cannot have duplicate bookmarks. Sorry!')
        .ariaLabel('Error')
        .ok('Ok')
        .targetEvent(ev)
    );
  }; //END dialog for error

  /* MdDialog for succesfully bookmarking resource */
  vm.bookmarkAlertSuccess = function (ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Thank You!')
        .textContent('Bookmark has been added, please navigate to the User tab to view the addition.')
        .ariaLabel('Error')
        .ok('Ok')
        .targetEvent(ev)
    );
  }; //END dialog for success

  /* start POST route for adding bookmark to User tab, userbookmarked table */
  vm.bookmark = function (id) {
    console.log(id, 'on bookmark, resourceid');
    $http.post('/info/bookmark/' + id).then(function (response) {
      vm.bookmarkAlertSuccess(event);  //call success dialog when success
    }).catch(function (error) {
      vm.bookmarkAlertError(event); //call failure when failure
    })
  } //end POST to userbookmarked table

  /* PUT route for recommending a resource, recommendations column on resources table */
  vm.recommend = function (id) {
    console.log(id, 'on recommend, resourceid');
    $http.put('/info/recommend/' + id).then(function (response) {
      vm.getResources();
      console.log('success!');
    }).catch(function (error) {
      console.log('failure');
    })
  } //END PUT for recommendations


  vm.resourceAlert = function (ev, resource) {
    console.log(vm.resourceTest, 'US test');
    console.log(resource, 'resource on info controller');
    var resourceToSend = resource;
    UserService.getSingleResource(resourceToSend).then(function(){
      $mdDialog.show({
        controller: 'DialogController as info',
        templateUrl: 'views/templates/resourceDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        resolve: function () {
          return UserService.resource;
        }
      }
      )
    }
   )
  }

  vm.map = {
    ll: '44.906005, -93.198442',
    zoom: 18
}; // end map

});
