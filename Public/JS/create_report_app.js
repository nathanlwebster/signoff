'use strict';

$(function(){
	
    var model = {
        reportTitle:null,
        numColumns: 4,
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
        renderColumns: function (number) {
            var numOfColumns = number;
            var i = 1;
            while (i <= numOfColumns) {
                console.log(i);
                var newColumn = "Column " + i + ": <select value=column" + i + " id=column" + i + "></select><br>";
                $("#columnDiv").append(newColumn);
                var heading = "<input type='text' name='column" + i + "heading' id='column" + i + "heading'>"  
                $("#column" + i).after(heading);
            i++;
            }
        },
        renderColOptions: function(id, name) {
            var i = 1;
            var numOfColumns = model.numColumns;
            console.log(numOfColumns);
            while (i <= numOfColumns) {
                if (id > 6) {
                    var newOption = "<option value=" + name + ">" + name + "</option>";
                    $("#column" + i).append(newOption);
                } else {
                    
                }
            i++;
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
        },
        createColumnBoxes: function() {
            var numOfColumns = model.numColumns;
            view.renderColumns(numOfColumns);
        }
    };
    
    model.getDataCategories();
    controller.createColumnBoxes();
    
});