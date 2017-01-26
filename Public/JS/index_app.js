'use strict';

$(function(){
	
    var model = {
        
        reports: null,
        status: null,
        data_categories: null,

        getReportData: function(){
            $.getJSON('/listReport', function(data){
                   model.reports = data;
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
        } 

    };

	var view = {
        init: function() {
            //controller.createColOptions(model.reports);
        },
        renderColOptions: function(name) {
            var newReportOpt = "<option value=" + name + ">" + name + "</option>";
                        $("#selectReport").append(newReportOpt);
        }
    };

	var controller = {
        init: function(){
            model.getReportData();
            model.getAllStatus();
            model.getDataCategories();
            //controller.buildTable();
        },
        buildTable: function() {
            console.log(model.reports);
            model.reportTitle = "My New Report"; //input from user
            model.numColumns = 5; //input from user
            model.numRows = 10; //input from column 1 selection
            model.colHeaders = ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"]; //from create report by options
        },
        createColOptions: function(data) {
            $.each(data, function(key, value){
                //console.log(value.name);
                view.renderColOptions(value.name);
            });
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