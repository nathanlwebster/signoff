var app = angular.module('reportApp', []);

app.service('prepHeadings', function() {
    this.myFunc = function (data) {
        var len = data.length;
        var headings = [];
        console.log("Data: " + data[0]);
        var i = 0;
        while (i < len) {
        var access = "";
        var j = i + 1;
        access = "column" + j + "heading";
        console.log(access);
        headings[i] = data[0][access];
        i++;
        }
        return headings;

    }
});

app.controller('reportCtrl', function($scope, $http, prepHeadings) {
    $scope.name = "Report Title";
    $http.get("/listReport")
    .then(function(response) {
        //console.log(response.data);
        var report1rows = response.data[0].rows;
        //console.log(report1rows);
        {
            $scope.headings = prepHeadings.myFunc(response.data);
        }
        console.log("This is what is assigned to $scope.headings: " + $scope.headings);
    });
});


