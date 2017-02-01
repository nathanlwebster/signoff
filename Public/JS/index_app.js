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
            //console.log(reportData);
            $.post('/updateReport', reportData, function(data, status){
                //console.log("Here's the status: " + status); 
            });
        } 

    };

	var view = {
        init: function() {
            //controller.createColOptions(model.reports);
        },
        collectUpdate: function(){
            $("#form_submit").click(function(){
                var update = {};
                
                var reportNum = $("#reportNum").val();
                var numRows = $("#rowCount").val();
                var reportName = $("#reportName").val();

                var c = 1;
                while (c < 6) {
                    var columnHeading = "Column " + c;
                    update["column" + c + "heading"] = columnHeading;

                    var columnName = "column" + c;
                    update["column" + c] = columnName;

                    c++;
                }
               
                update.id = reportNum;
                update.name = reportName;
                update.columns = 5;
                
                var rows = [];
                var i = 0;
                while (i < numRows) {
                    var cell = {};
                    var j = 1;
                    while (j < 6) {
                        //console.log($("#row" + i + "col" + j + "val").val());
                        var cellVal = "col" + j + "val";
                        var cellType = "col" + j + "type";
                        cell[cellVal] = $("#row" + i + "col" + j + "val").val();
                        cell[cellType] = $("#row" + i + "col" + j + "val").attr('type');
                        rows[i] = cell;
                        //console.log(rows[i]);
                    j++;
                    }
                    
                //console.log(rows);
                i++;
                }
                update.rows = rows;
                //JSON.stringify(update);
                controller.reportUpdater(update);
                
            });
        }
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
            //console.log(model.reports);
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
        reportUpdater: function(data) {
            //var dataStringified = JSON.stringify(data);
            //console.log(dataStringified);
            model.updateReport(data);
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