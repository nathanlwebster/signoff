'use strict';

$(function(){
	
    var model = {
        
        getDataCategories: function(){
            $.getJSON('/listDataCategories', function(data){
                controller.passDataCategory(data);
            });
        },
        addDataCategory: function(newDataCategory){
            //console.log(newDataCategory);
            $.post('/addDataCategory', newDataCategory, function(data, status){
                console.log("Here's the status: " + status); 
            });
        },
        deleteDataCategory: function(oldDataCategory){
            $.post('/addDataCategory', oldDataCategory, function(data, status){
                console.log("Here's the status: " + status); 
            });
        }
    };

	var view = {
        renderRowDataCategory: function(id, name, data_type){
            var rowArray = [id, name, data_type];
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
        addDataCategory: function(){
            $("#data_category_submit").click(function(){
                view.id = ($("#id").val());
                view.Description = ($("#name").val());
                view.data_type = ($("#data_type").val());
                controller.newDataCategory(view.id, view.name, view.data_type);
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
        passDataCategory: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRowDataCategory(value.id, value.name, value.data_type);
            });    
        },
        newDataCategory: function(id, name, data_type){
            var data = "{id: " + id + ",name: " + name + ",data_type: " + data_type + "}";
            model.addDataCategory(data);
        },
        removeDataCategory: function(id){
            var data = "{id: " + id + "}";
            model.deleteDataCategory(data);;
        }
    };
    
    model.getDataCategories();
    view.addDataCategory();
    view.deleteRowDataCategory();
});