'use strict';

$(function(){
	
    var model = {
        numColumns:null,
        numRows:null,
        minRow:null,
        minCol:null,
        maxRow:null,
        maxCol:null,
        rowHeaders: [],
        colOptions: [],
        init: function() {
            this.minRow = 1;
            this.minCol = 1;
            this.maxRow = 5;
            this.maxCol = null;

        }        
    };

	var view = {
        
        
    };

	var controller = {
        buildTable: function() {
            model.numColumns = 5; //input from user
            
        }
    };
    
    
});