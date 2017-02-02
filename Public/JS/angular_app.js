var app = angular.module('reportApp', ['ngStorage']);

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

app.controller('reportCtrl', function($scope, $http, prepHeadings, $sessionStorage) {
    
    // if ($sessionStorage.currentReport) {
    //     $scope.name = document.getElementById("result").innerHTML;
    //     console.log($scope.name);
    // } else {
    //     $scope.name = "Report Title";
    // }
    
    $scope.$storage = $sessionStorage.$default({
        title: "Report Title"
    });

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
        
        // console.log("Response name is: " + response.data[0].name);
        // console.log("Response ID is: " + response.data[0].id);
        // console.log("$scope.name is: " + $scope.name)

        
        var reportNum = 9999;
        $scope.$watch("name", function(newValue) {
            //console.log("Watching name. newValue = " + newValue);
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
            if (response.data[newValue] != null) {
            $scope.rows = response.data[newValue].rows;
            $scope.headings = response.data[reportNum];
            $scope.rowCount = response.data[reportNum].rows.length;
            }
        });

        
        {
            if (reportNum != 9999) {
            $scope.reportNum = reportNum;
            $scope.headings = response.data[reportNum];
            $scope.rows = response.data[reportNum].rows;
            }
        }
        
        

    });
});


