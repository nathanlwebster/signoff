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
    $scope.nextID;
    $scope.saveMessage;
    $scope.newReport;
    $scope.dataCategories;
    


    //create the report body
    $http.get("/listReport")
    .then(function(response) {
        //set master scope for reports
        $scope.reportData = response.data;
        
        //set new report scope
        $scope.newReport = $scope.reportData[0];
        $scope.newReport.col1visible = "true";
        $scope.newReport.col2visible = "true";
        $scope.newReport.col3visible = "true";
        $scope.newReport.col4visible = "true";
        $scope.newReport.col5visible = "true";

        //get report titles for select report dropdown and next id to create new report
        var reportArray = [];
        var ids = [];
        for (var i = 0; i < $scope.reportData.length; i++) {
            var newReport = $scope.reportData[i];
            var newID = $scope.reportData[i].id;
            reportArray[i] = newReport;
            ids.push(newID);
        }
        $scope.reports = reportArray;

        //get max id
        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
        }
        $scope.nextID = getMaxOfArray(ids) + 1;
        });

    //Get WFDS report status types
    $http.get("/listStatus")
    .then(function(response) {
        $scope.status = response.data;
    });

    //Get data categories
    $http.get("/listDataCategories")
    .then(function(response) {
        var categories = [];
        for (var i = 0;i < response.data.length;i++)
        categories[i] = response.data[i];
        $scope.dataCategories = categories;
        //console.log($scope.dataCategories);
    });

    //Get input types
    $http.get("/listInputTypes")
    .then(function(response) {
        var inputs = [];
        for (var i = 0;i < response.data.length;i++)
        inputs[i] = response.data[i];
        $scope.inputTypes = inputs;
    });

    //after report is selected from dropdown, update scope
    $scope.reportSelect = function(id) {
        $scope.report = $scope.reportData[id];
        $scope.column1 = $scope.report.column1;
        $scope.rows = $scope.report.rows;
        $scope.columns = $scope.report.columns;
    }

    //when row is selected to edit, update scope
    $scope.rowSelect = function(id) {
        $scope.row = $scope.report.rows[id];
        $sessionStorage.SaveMessage = "";
        $scope.saveMessage = $sessionStorage.SaveMessage;
    }

    //when save button is clicked on edit_row page, post data to json
    $scope.mySave = function() {
        var data = [$scope.report, $scope.row];
        $http.post("/updateRow", data)
        .then(function(response) {
            if (response.status == 200) {
                $sessionStorage.SaveMessage = "Changes were saved!";
                $scope.saveMessage = $sessionStorage.SaveMessage;
            }             
        });
    }

    $scope.newReportSubmit = function() {
        
        //collect data for $scope.newReport.rows
        var newRows = [];
        for (var i = 0; i < $scope.newReport.col1val.data.length; i++) {
        var col1 = $scope.newReport.col1val.data[i].description;
        newRows[i] = {};
        newRows[i].id = i;
        newRows[i].col1val = col1;
        newRows[i].col2val = "";
        newRows[i].col3val = "";
        newRows[i].col4val = "";
        newRows[i].col5val = "";
        }

        //assign data to $scope.newReport.rows
        $scope.newReport.rows = newRows;
        $scope.newReport.id = $scope.nextID;
        
        //check data headings, selections, titles
        $scope.newReport.column1heading = $scope.newReport.col1val.name;

        //assign new id


        //post data to json file
        console.log($scope.newReport);
        var data = $scope.newReport;
        $http.post('/addReport', data)
        .then(function(response) {
            if (response.status == 200) {
                console.log("Report added!");
            }             
        });
    }

});


