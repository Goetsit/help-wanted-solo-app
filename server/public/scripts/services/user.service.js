myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.singleResource = {};

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }

  self.getSingleResource = function (resource) {
    console.log(resource, 'hello user service');
    return $http.get('/info/' + resource).then(function (response) {
      console.log('Success!');
      // check to make sure data.lenth > 0
      self.singleResource.data = response.data[0];
      console.log(self.singleResource.data, 'resource array on get');
    }).catch(function (error) {
      console.log('Failure!', error);
    });
  }


});
