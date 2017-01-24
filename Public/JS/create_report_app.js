'use strict';

$(function(){
	
    var model = {
        reportTitle:null,
        numColumns:null,
        numRows:null,
        minRow:null,
        minCol:null,
        maxRow:null,
        maxCol:null,
        colHeaders: [],
        colOptions: [],
        init: function() {
            this.minRow = 1;
            this.minCol = 1;
            this.maxRow = 5;
            this.maxCol = null;
        },
        getDataCategories: function(){
            $.getJSON('/listDataCategories', function(data){
                   controller.createColOptions(data);
            });
        }      
    };

	var view = {
        renderColOptions: function(id, name) {
            console.log(name);
            if (id < 6) {
            var newOption = "<option value=" + name + ">" + name + "</option>";
            $("#column1").append(newOption);
            } else {
                
            }
        }
         
    };

	var controller = {
        buildTable: function() {
            model.reportTitle = "My New Report"; //input from user
            model.numColumns = 5; //input from user
            model.numRows = 10; //input from column 1 selection
            model.colHeaders = ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"]; //from create report by options
        },
        createColOptions: function(data) {
            $.each(data, function(key, value){
                view.renderColOptions(value.id, value.name);
            });
        }
    };
    
    model.getDataCategories();
    
});