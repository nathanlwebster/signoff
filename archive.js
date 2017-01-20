'use strict';

$(function(){
	
    var model = {
        
        getAll: function(){
            $.getJSON('status.json', function(data){
                   model.currentID = data.length;
                   controller.passData(data);
            });
        },
        addStatus: function(){
            var nextID = model.currentID + 1;
            console.log(model.currentID + 1);
            var data = '{"id":"' + nextID + '","Description":"' + view.value + '"}';
            console.log(data);
            $.post('status.json', data, function(){
                console.log("Data was posted.");
            });
        }

    };

	var view = {
        renderRow: function(obj){
            $("#statusTable").append("<tr><td>" + obj + "</td></tr>");
        },
        addRow: function(){
            $("#status_submit").click(function(){
                view.value = ($("#status").val());
                controller.newStatus();
            });
        }
    };

	var controller = {
        passData: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRow(value.Description); 
            });    
        },
        newStatus: function(){
            model.addStatus();
        }
    };
    
   model.getAll();
   view.addRow();
});