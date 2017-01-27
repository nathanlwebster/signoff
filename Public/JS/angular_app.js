var app = angular.module('reportApp', []);

app.service('prepHeadings', function() {
    this.myFunc = function (data) {
        var len = data.length;
        var headings = [];
        var i = 0;
        while (i < len) {
        var concatColumn = "";
        var j = i + 1;
        concatColumn = "column" + j + "heading";
        headings[i] = data[0][concatColumn];
        i++;
        }
        return headings;
    }
});

app.controller('reportCtrl', function($scope, $http, prepHeadings) {
    $scope.name = "Report Title";
    $http.get("/listReport")
    .then(function(response) {
        //console.log("This is response.data: " + response.data);
        //var reportData = JSON.stringify(response.data);
        
        //if the report name == the view report name, set the report as variable

        //set the report data as $scope variables

        var getKeys = function(obj){
            var keys = [];
            for (var key in obj){
                keys.push(key);
            }
            return keys
        }
        var gotKeys = getKeys(response.data[0].rows[0]);
        console.log("gotKeys: " + gotKeys);
        {
            $scope.headings = prepHeadings.myFunc(response.data);
            $scope.rows = response.data[0].rows;
        }
        
        console.log("This is the rows data: " + $scope.rows);
        {
            // $scope.headings = prepHeadings.myFunc(response.data);
            // $scope.rows = prepRows.myFunc(response.data);
        }
        //console.log("This is what is assigned to $scope.rows: " + $scope.rows[0][1]);
    });
});


