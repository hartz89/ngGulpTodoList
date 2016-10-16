'use strict';

angular.module('todoApp.services')
  .factory('StorageService', storageServiceFactory);

function storageServiceFactory($localStorage) {
  return new StorageService($localStorage);
}

// the StorageService class...

function StorageService(storage) {
  this.storage = storage;
}

StorageService.prototype.get = function(key) {
  return this.storage[key];
};

StorageService.prototype.save = function(key, value) {
  this.storage[key] = value;
};

StorageService.prototype.remove = function(key) {
  delete this.storage[key];
};

StorageService.prototype.clear = function() {
  this.storage.$reset();
};