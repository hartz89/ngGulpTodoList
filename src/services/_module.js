'use strict';

// define the services module
angular.module('todoApp.services', ['ngStorage'])
  .config(ngStorageConfig);

function ngStorageConfig($localStorageProvider) {
  // configure localStorage to use a prefix for this app
  $localStorageProvider.setKeyPrefix('rhTodo');
}