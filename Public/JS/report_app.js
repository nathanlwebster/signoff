'use strict';

$(function(){
	
    var model = {
        
        getAllReports: function(){
            $.getJSON('/listReport', function(data){
                   console.log(data);
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
            var rowArray = [id, name, columns];
            var rowArrayLength = rowArray.length;
            var newRow = "";
            $.each(rowArray, function(index, value){
                if (index == rowArrayLength) {
                    newRow += "<td>" + value + "</td></tr>";
                }
                else if (index == 0) {
                    newRow += "<tr><td>" + value + "</td>";   
                } else {
                    newRow += "<td>" + value + "</td>";
                } 
            });
            $("tr:last").after(newRow);
            newRow = "";
        },
        addRowReport: function(){
            $("#report_submit").click(function(){
                view.id = ($("#id").val());
                view.name = ($("#name").val());
                view.columns = ($("#columns").val());
                view.column1 = ($("#column1").val());
                view.column1heading = ($("#column1heading").val());
                view.column2 = ($("#column2").val());
                view.column2heading = ($("#column2heading").val());
                view.column3 = ($("#column3").val());
                view.column3heading = ($("#column3heading").val());
                view.column4 = ($("#column4").val());
                view.column4heading = ($("#column4heading").val());
                view.column5 = ($("#column5").val());
                view.column5heading = ($("#column5heading").val());
                
                controller.newReport(view.id, view.name, view.columns, view.column1, view.column1heading,
                view.column2, view.column2heading, view.column3, view.column3heading, view.column4, view.column4heading,
                view.column5, view.column5heading);
                
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
        newReport: function(id, name, columns){
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