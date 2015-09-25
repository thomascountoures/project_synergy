todoApp.controller('addTodoController', ['$scope', '$resource', function ($scope, $resource) {

	//Create a new resource object and get current todos in database
	var Todo 	  	 	   = $resource('/api/todos'),
		//Todo.query() returns a promise, don't forget!
		currentTodos 	   = Todo.query();

	$scope.todoObject  = { "status" : "incomplete" };

	currentTodos.$promise.then(function(results) {			
	
		/* 
		   REMEMBER: results are NOT the JSON objects from the database. .then() in a promise returns another PROMISE. 
		   So, you can't just 'return results' and store it inside a variable like this:

		   var results = currentTodoPromise.$promise.then(...etc.) and then go 
		   $scope.todoObjects = results 
		   
		   because again, the returned value is a PROMISE. that's why $scope.todoObjects is assigned to results INSIDE the
		   'then' method.
	   */

		//good articles on Promises: https://spring.io/understanding/javascript-promises and http://www.html5rocks.com/en/tutorials/es6/promises/

		$scope.todoObjects = results;
		
	}, function(error) {
		console.error(error)
	});
	
	$scope.submitTodo = function () {		
		
		$scope.todoObject.name = $scope.todo;
		

		console.dir($scope.todoObject);

		/*
		important to remember: when you save an object to the database, the data that is returned is 
		an INSTANCE of the resource object. .save() is a method of the $resource CLASS, and when you
		do a save, you are actually doing a POST to the server. the data that is returned is in the
		callback function, and is called 'resourceInstance' - if you console.dir this, you will see
		that it is an INSTANCE of the $resource class, and has 5 methods in its prototype: $get, $save,
		$delete, $query, $remove (note the $ prefix). So you can also do 'var todo = new Todo()' and 
		then call $save on todo like this: todo.$save() and save the object. it has two parameters in its 
		callback function according to the docs - u, putResponseHeaders - u is the saved object, 
		putResponseHeaders are the headers 
		*/
		Todo.save($scope.todoObject, function(resourceInstance) {
			
			console.dir(resourceInstance);
			
			console.log("todo saved!");


			$scope.todoObjects.push(resourceInstance);

			$scope.todo = '';

			
			//result is being sent back by the server
			
		//error
		}, function(err) {
			console.log("could not save!");
		}); 
		
				
	}


}]);