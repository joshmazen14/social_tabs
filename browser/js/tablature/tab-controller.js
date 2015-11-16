app.controller('TabCtrl', function($scope, $compile, $element, TabFactory) {
	$scope.numLines = 1
	//Whenever a new line is added, it increases the numLines (and adds a new row, which will need to be implemented later)
	$scope.addRow = function() {
		var el = $compile("<tab-writer></tab-writer>")($scope);
		$element.children('#tablature').append(el);
		$scope.numLines++;
	}
	$scope.removeRow = function() {
		var L = $element.children('#tablature').children().length-1;
		$element.children('#tablature').children()[L].remove()
		$scope.numLines--;
	}
	$scope.fullTabs = function() {
		var allTabElements = $element.children('#tablature').children().children('.song-tabs')
		var allTabs = []
		for (var tab=0; tab<allTabElements.length; tab++) {
			var currentTab = allTabElements[tab].getAttribute('tableData')
			currentTab = JSON.parse(currentTab)
			allTabs.push(currentTab)
		}
		for (var i=1; i<allTabs.length; i++) {
			for (var j=0; j<allTabs[i].length; j++) {
				allTabs[0][j] = allTabs[0][j].concat(allTabs[i][j])
			}
		}
		return allTabs[0]
	}

	$scope.play = function() {
		var fullTabs = $scope.fullTabs()
		TabFactory.play(fullTabs)
	}
})