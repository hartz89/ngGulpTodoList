'use strict';

angular.module('todoApp.services')
  .factory('TodoService', todoServiceFactory);

function todoServiceFactory(StorageService) {
  return new TodoService(StorageService);
}


// the TodoService class...

function TodoService(storage) {
  this.$storage = storage;

  // if no todos have been set up yet, store an empty array
  if (!this.$getAll()) {
    this.$init();
  }
}

TodoService.prototype.create = function(todo) {
  var allTodos = this.$getAll();

  var newLength = allTodos.push(todo); // add the todo, returns new array length
  todo.$id = newLength - 1; // use the index in storage as the element ID
};

TodoService.prototype.getList = function() {
  // return an empty array if never stored
  return this.$getAll();
};

TodoService.prototype.getOne = function(id) {
  return this.$getAll()[id];
};

TodoService.prototype.remove = function(todo) {
  var index = todo.$id;
  var allTodos = this.$getAll();

  // remove the TODO from the array
  var deleted = allTodos.splice(index, 1);

  // nullify the deleted element's ID (in case a view model still has a reference)
  deleted[0].$id = null; 

  // decrement trailing IDs
  for (var i = index; i < allTodos.length; i++) {
    allTodos[i].$id--;
    console.log('decremented todo id: ' + allTodos[i].$id);
  }
};

TodoService.prototype.clear = function() {
  this.$getAll().length = 0;
};

// methods intended for internal use (denoted by $ prefix)

TodoService.prototype.$getAll = function() {
  return this.$storage.get('todos');
};

TodoService.prototype.$init = function() {
  this.$storage.save('todos', []);
};