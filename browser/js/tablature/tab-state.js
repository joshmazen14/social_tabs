app.config(function($stateProvider) {
	$stateProvider.state('write', {
		url: '/createTab',
		templateUrl: 'js/tablature/tablature.html',
		controller: 'TabCtrl'
	})
})