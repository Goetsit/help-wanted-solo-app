myApp.controller('DialogController', function($scope, $http,UserService,$mdDialog, NgMap) {
    var vm = this;
    vm.userService = UserService;
    vm.singleResource = UserService.singleResource;

    NgMap.getMap().then(function(map) {
        $scope.map = map;
        let latLong = {lat : parseFloat(vm.singleResource.data.lat),
            lng : parseFloat(vm.singleResource.data.long)};
        console.log('latLong',latLong);
		google.maps.event.trigger($scope.map, "resize");
		// console.log('LatLng', $scope.LatLng)
		$scope.map.markers[0].setPosition(latLong);
		$scope.map.setCenter(latLong);
		// console.log($scope.map)

	});
});