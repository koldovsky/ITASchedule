/**
 * Created by marian on 14.10.16.
 */
(function() {
    'use strict';

    angular.module('app.groups').filter('pages', function($window){
        return function(input, currentPage, totalPages, range){
            currentPage = parseInt(currentPage);
            totalPages = parseInt(totalPages);
            totalPages = totalPages - 1;
            range = parseInt(range);
            var minPage = (currentPage - range < 0) ? 0 : (currentPage - range > (totalPages - (range * 2))) ? totalPages - (range * 2) : currentPage - range;
            var maxPage = (currentPage + range > totalPages) ? totalPages : (currentPage + range < range * 2) ? range * 2 : currentPage + range;

            for(var i=minPage; i<maxPage; i++) {
                input.push(i);
            }
           // $window.alert("YO"+JSON.stringify(input));
            return input;
        };
    });

})();