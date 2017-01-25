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

[
  '{{repeat(5, 7)}}',
  {
    id: '{{index()}}',
    name: '{{firstName()}}',
    columns: '{{integer(1, 5)}}',
    column1: 'column1',
    column1heading: 'column1heading',
    column2: 'column2',
    column2heading: 'column2heading',
    column3: 'column3',
    column3heading: 'column3heading',
    column4: 'column4',
    column4heading: 'column4heading',
    column5: 'column5',
    column5heading: 'column5heading',
    rows: [
      '{{repeat(30)}}',
      {
        id: '{{index()}}',
        col1val: '{{company()}}',
        col2val: '{{company()}}',
        col3val: '{{company()}}',
        col4val: '{{company()}}',
        col5val: '{{company()}}'
      }
    ]    
  }
]