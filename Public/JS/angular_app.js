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
        
        var titleArray = [];
        var i = 0;
        while (i < response.data.length) {
            var newTitle = response.data[i].name;
            titleArray[i] = newTitle;
            i++;
        }
        $scope.titles = titleArray;
        
        console.log("Response name is: " + response.data[0].name);
        console.log("Response ID is: " + response.data[0].id);
        console.log("$scope.name is: " + $scope.name)

        
        var reportNum = 0;
        $scope.$watch("name", function(newValue) {
            console.log("Watching name. newValue = " + newValue);
            var i = 0;
            while (i < response.data.length) {
                if (response.data[i].name == newValue) {
                   reportNum = response.data[i].id;
                   $scope.reportNum = reportNum;
                } 
                i++;
            }
        });

        $scope.$watch("reportNum", function(newValue) {
            $scope.rows = response.data[newValue].rows;
        });

        
        {
                               
            $scope.reportNum = reportNum;
            $scope.headings = response.data[reportNum];
            $scope.rows = response.data[reportNum].rows;
           
        }
        
        //console.log("This is the rows data: " + $scope.rows);
        {
            // $scope.headings = prepHeadings.myFunc(response.data);
            // $scope.rows = prepRows.myFunc(response.data);
        }
        //console.log("This is what is assigned to $scope.rows: " + $scope.rows[0][1]);

        // var getKeys = function(obj){
        //     var keys = [];
        //     for (var key in obj){
        //         keys.push(key);
        //     }
        //     return keys
        // }
        // var gotKeys = getKeys(response.data[reportNum]);
        //console.log("gotKeys: " + gotKeys);

    });
});


