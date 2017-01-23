'use strict';

$(function(){
	
    var model = {
        
        getAllDataCategories: function(){
            $.getJSON('/listDataCategories', function(data){
                   controller.passData(data);
            });
        },
        addDataCategory: function(newDataCategory){
            console.log(newDataCategory);
            $.post('/addDataCategory', newDataCategory, function(data, status){
                console.log("Here's the status: " + status); 
            });
        },
        deleteDataCategory: function(oldDataCategory){
            $.post('/addStatus', oldDataCategory, function(data, status){
                console.log("Here's the status: " + status); 
            });
        }
    };

	var view = {
        renderRowDataCategory: function(id, name){
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
        addRowDataCategory: function(){
            $("#data_category_submit").click(function(){
                view.id = ($("#id").val());
                view.Description = ($("#name").val());
                controller.newStatus(view.id, view.name);
            });
        },
        deleteRowDataCategory: function(){
            $("#delete_data_category").click(function(){
                view.id = ($("#deleteID").val());
                controller.removeDataCategory(view.id);
            });
        }
        
    };

	var controller = {
        passData: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRow(value.id, value.name);
            });    
        },
        newDataCategory: function(id, name){
            var data = "{id: " + id + ",Name: " + name + "}";
            model.addDataCategory(data);
        },
        removeDataCategory: function(id){
            var data = "{id: " + id + "}";
            model.deleteDataCategory(data);;
        }
    };
    
    model.getAllDataCategories();
    view.addRowDataCategory();
    view.deleteRowDataCategory();
});