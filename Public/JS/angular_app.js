var app = angular.module('reportApp', ['ngStorage', 'ngRoute']);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/main.ejs"
    })
    .when("/reports", {
        templateUrl : "/views/reports.ejs"
    })
    .when("/paris", {
        templateUrl : "paris.htm"
    });

    $locationProvider.html5Mode(true);
});

app.controller('reportCtrl', function($scope, $http, $sessionStorage) {
    
    //get and store the report name
    if ($scope.$storage) {
         $scope.name = $scope.$storage.title;
    } else {
        $scope.$storage = $sessionStorage.$default({
            title: "Report Title"
        });
        $scope.name = $scope.$storage.title;
    }

   
    $scope.mySave = function() {
        var i = 0;
        while (i < $scope.rows.length) {
            console.log($scope.rows[i].col2val);
            i++;
        }
    }

    //create the report body
    $http.get("/listReport")
    .then(function(response) {
        

        //get report titles for select report dropdown
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

        //watch the report name and update the report number
        var reportNum = 9999;
        $scope.$watch("name", function(newValue) {
            //console.log("Watching name. newValue = " + newValue);
            $scope.$storage.title = newValue;
            var i = 0;
            while (i < response.data.length) {
                if (response.data[i].name == newValue) {
                   reportNum = response.data[i].id;
                   $scope.reportNum = reportNum;
                } 
                i++;
            }
        });

        //watch the report number and change the values of the report with it
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

    $http.get("/listStatus")
    .then(function(response) {
        
        var statusOptions = [];
        var i = 0;
        while (i < response.data.length) {
            statusOptions[i] = response.data[i].Description;
            i++;
        }
        //console.log(statusOptions);
        $scope.status = statusOptions;
        //console.log($scope.status);
    });
});


