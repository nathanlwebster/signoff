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
        renderRowReport: function(id, name, columns, column1, column1heading, column2, column2heading,
        column3, column3heading, column4, column4heading, column5, column5heading){
        var rowArray = [id, name, columns, column1, column1heading, column2, column2heading,
            column3, column3heading, column4, column4heading, column5, column5heading];
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
                view.renderRowReport(value.id, value.name, value.columns, value.column1, value.column1heading,
                value.column2, value.column2heading, value.column3, value.column3heading, value.column4, value.column4heading,
                value.column5, value.column5heading);
            });    
        },
        newReport: function(id, name, columns, column1, column1heading, column2, column2heading, column3, column3heading, column4, column4heading, column5, column5heading){
            var data = "{id: " + id + ",name: " + name + ",columns: " + columns + ",column1: " +  column1 + 
            ", column1heading: " + column1heading + ",column2: " + column2 + ",column2heading: " + column2heading +
            ",column3: " +  column3 + ", column3heading: " + column3heading + ",column4: " + column4 + ",column4heading: "
             + column4heading + ",column5: " +  column5 + ", column5heading: " + column5heading + "}";
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