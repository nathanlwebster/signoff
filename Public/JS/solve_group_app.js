'use strict';

$(function(){
	
    var model = {
        
        getAllSolveGroups: function(){
            $.getJSON('/listSolveGroup', function(data){
                   controller.passData(data);
            });
        },
        addSolveGroup: function(newSolveGroup){
            console.log(newSolveGroup);
            $.post('/addSolveGroup', newSolveGroup, function(data, SolveGroup){
                console.log("Here's the SolveGroup: " + SolveGroup); 
            });
        },
        deleteSolveGroup: function(oldSolveGroup){
            $.post('/addSolveGroup', oldSolveGroup, function(data, SolveGroup){
                console.log("Here's the SolveGroup: " + SolveGroup); 
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
            $("#SolveGroup_submit").click(function(){
                view.id = ($("#id").val());
                view.solve_group = ($("#solve_group").val());
                controller.newSolveGroup(view.id, view.solve_group);
            });
        },
        deleteRow: function(){
            $("#delete_solve_group").click(function(){
                view.id = ($("#deleteID").val());
                controller.removeSolveGroup(view.id);
            });
        }
        
    };

	var controller = {
        passData: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRow(value.id, value.solve_group);
            });    
        },
        newSolveGroup: function(id, solve_group){
            var data = "{id: " + id + ",solve_group: " + solve_group + "}";
            model.addSolveGroup(data);
        },
        removeSolveGroup: function(id){
            var data = "{id: " + id + "}";
            model.deleteSolveGroup(data);;
        }
    };
    
    model.getAllSolveGroups();
    view.addRow();
    view.deleteRow();
});