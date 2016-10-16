'use strict';

angular.module('todoApp.components')
  .controller('TodoEditorController', todoEditorController);

function todoEditorController(todo, TodoService, $state) {

  const cntl = this;

  // hang onto the original and bind a copy to scope
  // so that we can roll back changes when editing
  var orig = todo;
  this.todo = angular.copy(todo); 
  this.isNew = (todo.$id === null);

  this.saveTodo = function() {
    if (this.isNew) {
      this.todo.creationDate = new Date();
      TodoService.create(this.todo);
    } else {
      angular.extend(orig, this.todo);
    }

    $state.go('todos');
  };

  this.cancel = function() {
    $state.go('todos');
  };

  this.remove = function() {
    if (!this.isNew) {
      TodoService.remove(this.todo);
    }
    $state.go('todos');
  };

  this.openDatePicker = function() {
    this.datePickerOpen = true;
  };
  

}