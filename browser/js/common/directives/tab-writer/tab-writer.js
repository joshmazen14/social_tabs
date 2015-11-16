app.directive('tabWriter', function($document, $compile, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/tab-writer/tab-writer.html',
		scope: {
			tableData: '='
		},
		link: function(scope, element) {
			//create a 6-line tab layout
			scope.tableData = (function() {
				var arr = [];
				for (var i=0; i<6; i++) {
					arr.push([])
					for (var j=0; j < 85; j++) {
						arr[i][j] = {
							fret: null,
							duration: undefined
						}
					}
				}
				return arr
			})()

			//initializes active column, columnIndex, and the fret model
			scope.activeCol;
			scope.activeColIdx
			scope.fretter;

			scope.notes = ['E', 'B', 'G', 'D', 'A', 'E']

			scope.setActive = function(col, idx){
				scope.tableData.forEach(function(row) {
					for (var i=0; i<row.length; i++) {
						row[i].active = false
						row[i].superActive = false
					}
					row[idx].active = true
				})
				col.superActive = true
				scope.activeCol = col
				scope.activeColIdx = idx
			}

			$document.bind('keydown', function(e) {
		        var rowIndex;
		        scope.tableData.forEach(function(elem, idx) {
		          	for (var column = 0; column < elem.length; column++) {
		          		if (scope.tableData[idx][column].superActive) {
		          			rowIndex = idx
		          		}
		          	}
		        })
	          	var colIndex = scope.tableData[rowIndex].findIndex(function(col) {
	          		return col.superActive
	          	})
	          	if (colIndex === -1) {
	          		return
	          	}
	  			if (e.which === 37 && colIndex > 0) {
	  				e.preventDefault()
	  				scope.setActive(scope.tableData[rowIndex][colIndex-1], colIndex-1);
	  				scope.$digest();
	  			}
	  			else if (e.which === 38 && rowIndex > 0) {
	  				e.preventDefault()
	  				scope.setActive(scope.tableData[rowIndex-1][colIndex], colIndex)
	  				scope.$digest()
	  			}
	  			else if (e.which === 39 && colIndex < 84) {
	  				e.preventDefault()
	  				scope.setActive(scope.tableData[rowIndex][colIndex+1], colIndex+1);
	  				scope.$digest()
	  			}
	  			else if (e.which === 40 && rowIndex < 5) {
	  				e.preventDefault()
	  				scope.setActive(scope.tableData[rowIndex+1][colIndex], colIndex)
	  				scope.$digest()
	  				e.stopPropagation()
	  			}
	  			else if (e.which === 8) {
	  				e.preventDefault()
	  				scope.fretter = ''
	  				scope.activeCol.fret = null
	  				scope.$digest()
	  			}
	        });
			
			scope.edit = function() {
				if (scope.fretter>=0 && scope.fretter<23 && scope.activeCol) {
					scope.activeCol.fret = scope.fretter
					scope.fretter = ''
				}
			}
			scope.addDuration = function(number) {
				for (var row=0; row<scope.tableData.length; row++) {
					scope.tableData[row][scope.activeColIdx].duration = number
				}
			}

			scope.hashDuration = function(number) {
				var hash = {
					undefined: " ",
					1: "W",
					2: "H",
					4: "Q",
					8: "E",
					16: "S",
					32: "T"
				}
				return hash[number]
			}

			scope.toggleBar = function() {
				for (var row=0; row<scope.tableData.length; row++) {
					if (!scope.tableData[row][scope.activeColIdx].bar) {
						scope.tableData[row][scope.activeColIdx].bar = true
					}
					else {
						scope.tableData[row][scope.activeColIdx].bar = false
					}
				}
			}
		}
	}
})