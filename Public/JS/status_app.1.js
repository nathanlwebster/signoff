'use strict';

$(function(){
	
    var model = {
        
        getAllReports: function(){
            $.getJSON('/listStatus', function(data){
                   controller.passData(data);
            });
        },
        addReport: function(newReport){
            console.log(newReport);
            $.post('/addReport', newReport, function(data, status){
                console.log("Here's the status: " + status); 
            });
        },
        deleteReport: function(oldReport){
            $.post('/addReport', oldReport, function(data, status){
                console.log("Here's the status: " + status); 
            });
        }
    };

	var view = {
        renderRowReport: function(key, val){
            var newRow = "<tr><td>" + key + "</td>" + "<td>" + val + "</td></tr>";
            //console.log(newRow);
            $("tr:last").after(newRow);
        },
        addRowReport: function(){
            $("#status_submit").click(function(){
                view.id = ($("#id").val());
                view.Description = ($("#Description").val());
                controller.newReport(view.id, view.name, view.report_columns);
            });
        },
        deleteRowReport: function(){
            $("#delete_status").click(function(){
                view.id = ($("#deleteID").val());
                controller.removeReport(view.id);
            });
        }
        
    };

	var controller = {
        passDataReport: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRow(value.id, value.name, value.report_columns);
            });    
        },
        newStatusReport: function(id, name, report_columns){
            var data = "{id: " + id + ",Description: " + Description + "}";
            model.addReport(data);
        },
        removeReport: function(id){
            var data = "{id: " + id + "}";
            model.deleteReport(data);;
        }
    };
    
    model.getAllReports();
    view.addRowReport();
    view.deleteRowReport();
});