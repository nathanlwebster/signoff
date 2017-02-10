var app = angular.module('reportApp', ['ngStorage', 'ngRoute', 'ui.bootstrap.modal']);


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
    $scope.nextID;
    
    //show modal message on return from edit
    if ($sessionStorage.SaveMessage) {
        $scope.showModal = true;
    } else {
        $scope.showModal = false;
    }

    //get and store the report name
    // if ($scope.$storage) {
    //      $scope.name = $scope.$storage.name;
    // } else {
    //     $scope.$storage = $sessionStorage.$default({
    //         name: "Report Title"
    //     });
    //     $scope.name = $scope.$storage.name;
    // }


    //create the report body
    $http.get("/listReport")
    .then(function(response) {
        $scope.reportData = response.data;

        //get report titles for select report dropdown and next id to create new report
        var reportArray = [];
        var idArray = [];
        var i = 0;
        while (i < $scope.reportData.length) {
            var newReport = $scope.reportData[i];
            var newID = $scope.reportData[i].id;
            reportArray[i] = newReport;
            idArray[i] = newID;
            i++;
        }
        $scope.reports = reportArray;
        
        //get and set next report id
        var largestID = Math.max.apply(Math, idArray);
        $scope.nextID = largestID + 1;
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
        $sessionStorage.SaveMessage = "";
        // console.log($scope.row);
        // var data = $scope.report;
        // $http.post("/getRow", data)
        // .then(function(response) {
        //     console.log(response);
        // });
    }

    //when save button is clicked on edit_row page, post data to json
    $scope.mySave = function() {
        var data = [$scope.report, $scope.row];
        $http.post("/updateRow", data)
        .then(function(response) {
            if (response.status == 200) {
                $sessionStorage.SaveMessage = "Changes were saved!";
            }
            
        });
    }

    $scope.setReportID = function() {
        console.log()
        $scope.report.id = $scope.nextID;
    }
    $scope.open = function() {
        $scope.showModal = true;
    }

    $scope.ok = function() {
        $scope.showModal = false;
    }

});


