'use strict';

$(function(){
	
    var model = {
        
        reports: null,
        status: null,
        data_categories: null,
        numReports: null,

        getReportData: function(){
            $.getJSON('/listReport', function(data){
                   model.reports = data;
                   model.numReports = data.length;
                   controller.createColOptions(data);
            });
        },
        getAllStatus: function(){
            $.getJSON('/listStatus', function(data){
                   model.status = data;
                   //controller.passData(data);
            });
        },
        getDataCategories: function(){
            $.getJSON('/listDataCategories', function(data){
                   model.data_categories = data;
                    //console.log(data);
                   
            });
        },
        updateReport: function(reportData){
            console.log(reportData);
            $.post('/updateReport', reportData, function(data, status){
                console.log("Here's the status: " + status); 
            });
        } 

    };

	var view = {
        init: function() {
            //controller.createColOptions(model.reports);
        },
        collectUpdate: function(){
            $("#form_submit").click(function(){
                var reportNum = $("#reportNum").val();
                var numRows = $("#rowCount").val();
                var update = [];
                var i = 0;
                while(i < model.numRows) {

                    if (!update[i]) {
                    update[i] = {};
                    } 
                    console.log(update[i]);

                    for(var j = 1; j < 6; j++) {

                        update[i][j] = $("#row" + i + "col" + j + "val").val();
                        // view["row" + i + "column" + j] = $("#row" + i + "col" + j + "val").val();
                        // update[i][j] = view["row" + i + "column" + j];
                        console.log("Update is: " + update);

                    }
                i++;    
                }
                view.id = ($("#row0col3val").val());
                view.id2 = ($("#row1col3val").val());

                //TODO Get value of checkboxes

                //view.solve_group = ($("#solve_group").val());
                //controller.reportUpdater(view.id, view.solve_group);
            });
        }
        // renderColOptions: function(name) {
        //     var newReportOpt = "<option value=" + name + ">" + name + "</option>";
        //                 $("#selectReport").append(newReportOpt);
        // }
    };

	var controller = {
        init: function(){
            model.getReportData();
            model.getAllStatus();
            model.getDataCategories();
            controller.buildTable();
            view.collectUpdate();
        },
        buildTable: function() {
            console.log(model.reports);
            model.reportTitle = "My New Report"; //input from user
            model.numColumns = 5; //input from user
            model.numRows = 10; //input from column 1 selection
            model.colHeaders = ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"]; //from create report by options
        },
        createColOptions: function(data) {
            // $.each(data, function(key, value){
            //     //console.log(value.name);
            //     view.renderColOptions(value.name);
            // });
        },
        reportUpdater: function() {

        }
        // createColumnBoxes: function() {
        //     var numOfColumns = model.numColumns;
        //     view.renderColumnSelectors(numOfColumns);
        // }
    };
    
    controller.init();
    view.init();
    //controller.createColumnBoxes();
    
});