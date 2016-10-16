'use strict';

// define the main todoApp module
angular.module('todoApp', [
  'ui.router', 'todoApp.components', 'todoApp.services'
])
.config(routeConfig);

// set up routes for the todoApp module
function routeConfig($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('todos', {
      url: '/todos',
      templateUrl: 'components/todo-list.html',
      controller: 'TodoListController',
      controllerAs: 'tlCntl',
      resolve: {
        todos: function(TodoService) {
          return TodoService.getList();
        }
      }
    })
    .state('todos.create', {
      url: '/create',
      templateUrl: 'components/todo-editor.html',
      controller: 'TodoEditorController',
      controllerAs: 'teCntl',
      resolve: {
        todo: function() {
          return {
            $id: null,
            text: '',
            dueDate: null,
            creationDate: null,
            completed: false
          }
        }
      }
    })
    .state('todos.edit', {
      url: '/:id/edit',
      templateUrl: 'components/todo-editor.html',
      controller: 'TodoEditorController',
      controllerAs: 'teCntl',
      resolve: {
        todo: function(TodoService, $stateParams) {
          return TodoService.getOne($stateParams.id);
        }
      }
    });

  $urlRouterProvider.otherwise('/todos');

}