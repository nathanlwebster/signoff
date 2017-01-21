'use strict';

$(function(){
	
    var model = {
        
        getAllReports: function(){
            $.getJSON('/listReport', function(data){
                   controller.passDataReport(data);
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
        renderRowReport: function(id, name, columns){
            var newRow = "<tr><td>" + id + "</td>" + "<td>" + name + "</td>" + "<td>" + columns + "</td></tr>";
            $("tr:last").after(newRow);
        },
        addRowReport: function(){
            $("#report_submit").click(function(){
                view.id = ($("#id").val());
                view.Description = ($("#Description").val());
                controller.newReport(view.id, view.name, view.report_columns);
            });
        },
        deleteRowReport: function(){
            $("#delete_report").click(function(){
                view.id = ($("#deleteID").val());
                controller.removeReport(view.id);
            });
        }
        
    };

	var controller = {
        passDataReport: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRowReport(value.id, value.name, value.columns);
            });    
        },
        newStatusReport: function(id, name, columns){
            var data = "{id: " + id + ",name: " + name + ",columns: " + columns + "}";
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