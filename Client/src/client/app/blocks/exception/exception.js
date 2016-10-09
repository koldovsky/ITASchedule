(function() {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception($q, logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return function(e) {
        var thrownDescription;
        var newMessage = 'Error: '+message+" "+e.status+" / "+e.statusText;
        if (e.data && e.data.description) {
          thrownDescription = '\n' + e.data.description;
          newMessage = message + thrownDescription;
        } else if(!e.data) {
          e.data={};
        };
        console.log('error message: '+newMessage);
        // e.data.description = 'error:'+newMessage;
        logger.error(newMessage);
        return $q.reject(e);
      };
    }
  }
})();
