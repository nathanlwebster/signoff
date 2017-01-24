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
        renderColumnSelectors: function (number) {
            var numOfColumns = number;
            var i = 1;
            while (i <= numOfColumns) {
                var newColumn = "Column " + i + ": <select name=column" + i + " id=column" + i + " class='columnSelectors'></select><br>";
                $("#columnDiv").append(newColumn);
                var heading = "<input type='text' name='column" + i + "heading' id='column" + i + "heading' class='columnHeadings'>"  
                $("#column" + i).after(heading);
            i++;
            }
        },
        renderColOptions: function(id, name) {
            var i = 1;
            var numOfColumns = model.numColumns;
            while (i <= numOfColumns) {
                if (i < 2) {
                    if (id < 6) {
                        var newOption = "<option value=" + name + ">" + name + "</option>";
                        $("#column" + i).append(newOption);
                    }
                } else {
                    if (id > 5) {
                        var newOption = "<option value=" + name + ">" + name + "</option>";
                        $("#column" + i).append(newOption);
                    }
                }
            i++;
            }
        },
        createNewReport: function() {
            $("#create_report_submit").click(function(){
                view.title = ($("#title").val());
                view.instructions = ($("#instructions").val());
                view.columns = ($("#colNum").val());

                var reportData = [];
                reportData[0] = view.title;
                reportData[1] = view.instructions;
                reportData[2] = view.columns
                var i = 1;
                var j = 3;
                var cols = view.columns;
                while (i <= cols) {
                    console.log("i is now: " + i);
                    reportData[j] = ($("#column" + i).val());
                    j++;
                    reportData[j] = ($("#column" + i + "heading").val()); 
                    console.log("This is the report data: " + reportData);
                    i++;
                    j++;
                }
                
                controller.newStatus();
            });
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
            view.renderColumnSelectors(numOfColumns);
        }
    };
    
    model.getDataCategories();
    controller.createColumnBoxes();
    
});