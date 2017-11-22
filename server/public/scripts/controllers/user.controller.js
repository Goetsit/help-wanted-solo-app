myApp.controller('UserController', function ($http, UserService, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.bookmarked = [];
  vm.userInfo = [];

  /* Initial GET route to popluate user page with their bookmarks */
  vm.getBookmarked = function () {
    $http.get('/user/bookmark').then(function (response) {
      console.log('Success!');
      vm.bookmarked = response.data;
    }).catch(function (error) {
      console.log('Failure!', error);
    });

  } //End GET

  vm.getBookmarked(); // call getBookmarked to actually poplaute



  /* MdDialog  set up for removing bookmarks  */
  vm.bookmarkAlertRemove = function (ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Removing Bookmark')
        .textContent('Bookmark has been removed. Thanks!')
        .ariaLabel('Error')
        .ok('Ok')
        .targetEvent(ev)
    );
  }; //END dialog for error

  /* DELETE from userbookmarked, removes book mark from user page */

  vm.removeBookmarked = function (index) {
    console.log(vm.bookmarked[index].resourceid, 'on remove bookmark');
    var id = vm.bookmarked[index].resourceid
    $http.delete('/user/bookmark/' + id).then(function (response) {
      console.log('Successfully deleted');
      vm.bookmarkAlertRemove(event);
      vm.getBookmarked();
    }).catch(function (error) {
      console.log('Failure on delete', error);
    });

  } //End DELETE


  /* Populate User Info for user info dialog box, GET*/
  vm.getUserInfo = function (user) {
    $http.get('/user/userinfo').then(function (response) {
      console.log('Success!');
      vm.userInfo = response.data;
      console.log(vm.userInfo, 'userinfo');
    }).catch(function (error) {
      console.log('Failure!', error);
    });
  }// End GET for user info

  vm.getUserInfo();

  /* User alert MdDialog box for User Details on User tab */
  vm.userAlert = function (ev) {
    console.log('dialog box');
    $mdDialog.show({
      controller: 'UserController',
      templateUrl: 'views/templates/userDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
  } //End MdDialog


  /* POST route for adding a new resource to resources */
  vm.newResource = function (newR) {
    console.log(newR, 'adding new resource');
      $http.post('/user/new', newR).then(function (response) {
       console.log('success!')
      }).catch(function (error) {
        console.log('failure')
      })
    //should be able to get enteredbyuserid from req.user.userid
  }//End POST

  /* MdDialog for entering in the new resource */
  vm.newResourceAlert = function (ev) {
    console.log('dialog box');
    $mdDialog.show({
      controller: 'UserController as uc',
      templateUrl: 'views/templates/new.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
  } //End MdDialog

});
