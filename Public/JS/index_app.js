'use strict';

$(function(){
	
    var model = {
        
        getReportData: function(){
            $.getJSON('/listReport', function(data){
                   console.log(data);
                   //controller.passDataReport(data);
            });
        },
        getAllStatus: function(){
            $.getJSON('/listStatus', function(data){
                   console.log(data);
                   //controller.passData(data);
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
    
    model.getReportData();
    model.getAllStatus();
    //controller.createColumnBoxes();
    
});