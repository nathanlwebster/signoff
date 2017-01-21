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
        renderRow: function(key, val){
            var newRow = "<tr><td>" + key + "</td>" + "<td>" + val + "</td></tr>";
            //console.log(newRow);
            $("tr:last").after(newRow);
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