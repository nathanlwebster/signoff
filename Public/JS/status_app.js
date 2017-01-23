'use strict';

$(function(){
	
    var model = {
        
        getAllStatus: function(){
            $.getJSON('/listStatus', function(data){
                   controller.passData(data);
            });
        },
        addStatus: function(newStatus){
            console.log(newStatus);
            $.post('/addStatus', newStatus, function(data, status){
                console.log("Here's the status: " + status); 
            });
        },
        deleteStatus: function(oldStatus){
            $.post('/addStatus', oldStatus, function(data, status){
                console.log("Here's the status: " + status); 
            });
        }
    };

	var view = {
        renderRow: function(id, name){
            var rowArray = [id, name];
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
        addRow: function(){
            $("#status_submit").click(function(){
                view.id = ($("#id").val());
                view.Description = ($("#Description").val());
                controller.newStatus(view.id, view.Description);
            });
        },
        deleteRow: function(){
            $("#delete_status").click(function(){
                view.id = ($("#deleteID").val());
                controller.removeStatus(view.id);
            });
        }
        
    };

	var controller = {
        passData: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRow(value.id, value.Description);
            });    
        },
        newStatus: function(id, Description){
            var data = "{id: " + id + ",Description: " + Description + "}";
            model.addStatus(data);
        },
        removeStatus: function(id){
            var data = "{id: " + id + "}";
            model.deleteStatus(data);;
        }
    };
    
    model.getAllStatus();
    view.addRow();
    view.deleteRow();
});