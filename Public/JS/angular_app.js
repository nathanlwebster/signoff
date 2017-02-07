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
    //      $scope.name = $scope.$storage.name;
    // } else {
    //     $scope.$storage = $sessionStorage.$default({
    //         name: "Report Title"
    //     });
    //     $scope.name = $scope.$storage.name;
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
        $scope.status = response.data;
    });

    //after report is selected from dropdown, update scope
    $scope.reportSelect = function(id) {
        $scope.report = $scope.reportData[id];
        $scope.column1 = $scope.report.column1;
        $scope.rows = $scope.report.rows;
    }

    //when row is selected to edit, update scope
    $scope.rowSelect = function(id) {
        $scope.row = $scope.report.rows[id];
    }


});


