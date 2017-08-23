$(function() {
	if (isIos() && isRunningStandalone()) {
		/*
		 * Initialize Fast Click. Even with the latest webkit updates,
		 * unfortunatley iOS standalone apps still have the 350ms click delay,
		 * so we need to bring in fastclick to alleviate this. See
		 * https://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
		 */
		FastClick.attach(document.body);
	}
});

isIos = function() {
	// Reference:
	// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios#answer-9039885
	return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

isRunningStandalone = function() {
	// Bullet proof way to check if iOS standalone
	var isRunningiOSStandalone = window.navigator.standalone;

	// Reliable way (in newer browsers) to check if Android standalone.
	// https://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#answer-34516083
	var isRunningAndroidStandalone = window
			.matchMedia('(display-mode: standalone)').matches;

	return isRunningiOSStandalone || isRunningAndroidStandalone;
};

angular.module('bar', []).controller('TodoListController', function() {
	var todoList = this;
	todoList.todos = [ {
		text : 'learn AngularJS',
		done : true
	}, {
		text : 'build an AngularJS app',
		done : false
	} ];

	todoList.addTodo = function() {
		todoList.todos.push({
			text : todoList.todoText,
			done : false
		});
		todoList.todoText = '';
	};

	todoList.remaining = function() {
		var count = 0;
		angular.forEach(todoList.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

	todoList.archive = function() {
		var oldTodos = todoList.todos;
		todoList.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done)
				todoList.todos.push(todo);
		});
	};
});