'use strict';

angular.module('todoApp.components')
  .controller('TodoListController', todoListController)
  .filter('todoListFilter', todoListFilter);

function todoListController(todos, $state, $scope, $filter, TodoService) {

  const cntl = this;

  this.todos = todos;
  this.showCompleted = false;

  this.clearTodos = function() {
    TodoService.clear();

    // back out of any editing we might be doing
    $state.go('todos');
  };

  this.editTodo = function(todo) {
    $state.go('todos.edit', { id: todo.$id });
  };

  this.filterTodo = function(todo) {
    return cntl.showCompleted || !todo.completed;
  };

  this.isOverdue = function(todo) {
    if (todo.dueDate) {
      var now = new Date();
      var dueDate = new Date(todo.dueDate);
      return now > dueDate;
    }

    return false;
  };
  
}

function todoListFilter() {
  return function(todos, showCompleted) {
    var filtered = [];

    angular.forEach(todos, function(todo) {
      if (showCompleted || !todo.completed) {
        filtered.push(todo);
      }
    });

    return filtered;
  }
}