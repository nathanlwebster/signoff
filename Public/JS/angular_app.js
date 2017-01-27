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

app.service('prepRows', function() {
    this.myFunc = function (data) {
        console.log("This is the data passed to prepRows: " + data);
        var len = data.length;
        console.log("This is data[0]: " + data[0]);
        var numRows = data[0].rows.length;
        //console.log("Number of rows: " + numRows);
        console.log("This is data[0].rows[0].col1val: " + data[0].rows[0].col1val);
        var newRows = [];
        
        var n = 0;
        while (n < numRows) {
            newRows[n] = {};
            var i = 0;
            while (i < len) {
            var concatName = "";
            var j = i + 1;
            concatName = "col" + j + "val";
            newRows[n][i] = data[0].rows[n][concatName];
            i++;
            }
        //console.log("newRows is: " + newRows);
        n++;

        }
        console.log("This is newRows[0][0]: " + newRows[0][0]);
        return newRows;
    }
});

app.controller('reportCtrl', function($scope, $http, prepHeadings, prepRows) {
    $scope.name = "Report Title";
    $http.get("/listReport")
    .then(function(response) {
        //console.log("This is response.data: " + response.data);
        var report1rows = response.data[0].rows;
        //console.log(report1rows);
        {
            $scope.headings = prepHeadings.myFunc(response.data);
            $scope.rows = prepRows.myFunc(response.data);
        }
        console.log("This is what is assigned to $scope.rows: " + $scope.rows[0][1]);
    });
});


