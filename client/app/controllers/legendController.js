todoApp.controller('legendController', ['$scope', '$resource', function($scope, $resource) {

	var Todo 			= $resource('/api/todos'),
		allTodos = Todo.query(function(results) {
			$scope.allTodos = results;
		});

	console.log(allTodos);	
	

}]);