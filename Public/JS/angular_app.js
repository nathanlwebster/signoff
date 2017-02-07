var app = angular.module('reportApp', ['ngStorage', 'ngRoute']);


app.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    
    $routeProvider
    .when("/", {
        templateUrl: "/views/main.html"
    })
    .when("/reports", {
        templateUrl : "/views/reports.html"
    })
    .when("/edit_row", {
        templateUrl : "/views/edit_row.html"
    })
    .when("/edit_data", {
        templateUrl : "/views/edit_data.html"
    })
    .when("/create_report", {
        templateUrl : "/views/create_report.html"
    });

});

app.controller('reportCtrl', function($scope, $http, $sessionStorage) {
    
    $scope.report;
    $scope.reports;
    $scope.rows;
    $scope.row;
    $scope.reportData;
    $scope.status;
    //get and store the report name
    // if ($scope.$storage) {
    //      $scope.name = $scope.$storage.title;
    // } else {
    //     $scope.$storage = $sessionStorage.$default({
    //         title: "Report Title"
    //     });
    //     $scope.name = $scope.$storage.title;
    // }

   
    // $scope.mySave = function() {
    //     var i = 0;
    //     while (i < $scope.rows.length) {
    //         console.log($scope.rows[i].col2val);
    //         i++;
    //     }
    // }

    //create the report body
    $http.get("/listReport")
    .then(function(response) {
        $scope.reportData = response.data;
        // console.log("Before changing data, name is: " + $scope.reportData[0].name);
        //$scope.reportData[0].name = 9999;
        // console.log("After changing, id is: " + $scope.reportData[0].name);
        // console.log("Master data is: " + $scope.reportData);

        //get report titles for select report dropdown
        var reportArray = [];
        var i = 0;
        while (i < $scope.reportData.length) {
            var newReport = $scope.reportData[i];
            reportArray[i] = newReport;
            i++;
        }
        $scope.reports = reportArray;
        
        });


    $http.get("/listStatus")
    .then(function(response) {
        console.log(response);
        var statusOptions = [];
        var i = 0;
        while (i < response.data.length) {
            statusOptions.push(response.data[i]);
            i++;
        }
        console.log(statusOptions);
        $scope.status = statusOptions;
        console.log($scope.status);
    });

    //after report is selected from dropdown, update scope
    $scope.reportSelect = function(id) {
        $scope.report = $scope.reportData[id];
        $scope.column1 = $scope.report.column1;
        $scope.rows = $scope.report.rows;
        //console.log($scope.report);
    }

    //when row is selected to edit, update scope
    $scope.rowSelect = function(id) {
        $scope.row = $scope.report.rows[id];
        //console.log($scope.row);
    }


});


