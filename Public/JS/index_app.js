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
                var cell = {};
                var i = 0;
                while (i < numRows) {
                    var j = 1;
                    while (j < 6) {
                        console.log($("#row" + i + "col" + j + "val").val());
                        var cellVal = "col" + j + "val";
                        var cellType = "col" + j + "type";
                        cell[cellVal] = $("#row" + i + "col" + j + "val").val();
                        cell[cellType] = $("#row" + i + "col" + j + "val").attr('type');
                        console.log(cell);
                        rows[i] = cell;
                    j++;
                    }
                    
                console.log(rows);
                i++;
                }
                update.rows = rows;

            //     update.id = reportNum;
            //     update.name = reportName;
            //     update.columns = 5;
            //     var rows = [];
            //     var i = 0;
            //     while(i < numRows) {
            //         if (!rows[i]) {
            //             //console.log("rows[i] is not created yet.");
            //         }
            //         if (!rows[i]) {
            //             rows[i] = [
            //                 "id",
            //                 "col1val",
            //                 "col2val",
            //                 "col3val",
            //                 "col4val",
            //                 "col5val",
            //                 "col1type",
            //                 "col2type",
            //                 "col3type",
            //                 "col4type",
            //                 "col5type"
            //             ];
            //         }
            //     i++;    
            //     } 
            //         //console.log(update[i]);
            //         var k = 0;
            //         while (k < numRows) {
            //             for(var j = 1; j < 6; j++) {
            //                 var concat1 = $("#row" + k + "col" + j + "val").val();
            //                 var concat2 = $("#row" + k + "col" + j + "val").attr('type');
            //                 // var concat3 = "col" + j + "val";
            //                 // var concat4 = "col" + j + "type";
            //                 //console.log("rows.k is: " + rows);
            //                 //rows[k]["col" + j + "val"] = concat1;
            //             }
            //         k++;
            //         }
               
            //     update.rows = rows;
            //     //console.log(update);
            //     //TODO Get value of checkboxes
                controller.reportUpdater(update);
            // });
        
        // }
        // renderColOptions: function(name) {
        //     var newReportOpt = "<option value=" + name + ">" + name + "</option>";
        //                 $("#selectReport").append(newReportOpt);
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