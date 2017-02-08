var express = require('express');
var app = express();
var bodyParser = require('body-parser').json();
var bodyParser2 = require('body-parser');
var fs = require("fs");
var stringify = require("json-stringify-pretty-compact");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser2.urlencoded({ extended: true });

//app.set('view engine', 'ejs');

app.use('/', express.static('public'));
app.use('/views/', express.static(__dirname + 'public/views'));


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html");
})

app.get('/reports', function (req, res) {
   res.sendFile(__dirname + "/" + "index.html");
})

app.get('/edit_row', function (req, res) {
   res.sendFile(__dirname + "/" + "index.html");
})

app.get('/edit_data', function (req, res) {
   res.sendFile(__dirname + "/" + "index.html");
})

app.get('/create_report', function (req, res) {
   res.sendFile(__dirname + "/" + "index.html");
})


/* Row API */

// app.post('/getRow', bodyParser, function (req, res) {
   
//    console.log(req.body.id);
//    res.send("getRow is working.");
//    fs.readFile( __dirname + "/" + "report.json", 'utf8', function (err, data) {
//         if (err) {
//             console.log(err);
//             res.redirect('/edit_row');
//         } else {
//         obj = JSON.parse(data);
//         console.log(obj[0].rows[0]);
//         // obj[index] = response;
//         // fs.writeFileSync('status.json', JSON.stringify(obj));
//         // res.redirect('/status');   
//         }
//    }); 
// })

app.post('/updateRow', bodyParser, function (req, res) {
    var reportID = req.body[0].id;
    var rowID = req.body[1].id;
    var rowData = req.body[1];
    console.log("Row data is: " + rowData);

   fs.readFile( __dirname + "/" + "report.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/edit_row');
        } else {
        obj = JSON.parse(data);
        obj[reportID].rows[rowID] = rowData;
        fs.writeFileSync('report.json', JSON.stringify(obj, null, 4));
        res.send('/edit_row');   
        }
   });
})


/* Status API */
app.get('/status', function (req, res) {
   res.sendFile( __dirname + "/" + "status.html");
})

app.get('/listStatus', function (req, res) {
   fs.readFile( __dirname + "/" + "status.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   }); 
})

app.post('/addStatus', urlencodedParser, function (req, res) {
   var index = req.body.id - 1;
   var response = {
       id:req.body.id,
       Description:req.body.Description      
   };
   fs.readFile( __dirname + "/" + "status.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/status');
        } else {
        obj = JSON.parse(data);
        obj[index] = response;
        fs.writeFileSync('status.json', JSON.stringify(obj));
        res.redirect('/status');   
        }
   });
   
   
})

app.post('/deleteStatus', urlencodedParser, function (req, res) {
    var index = req.body.id - 1;
    fs.readFile( __dirname + "/" + "status.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/status');
        } else {
        obj = JSON.parse(data);
        obj.splice(index, 1);
        //delete obj[index];

        fs.writeFileSync('status.json', JSON.stringify(obj));
        res.redirect('/status');   
        }
   });
})


/* Solve Group API */
app.get('/solve_group', function (req, res) {
   res.sendFile( __dirname + "/" + "solve_group.html");
})

app.get('/listSolveGroup', function (req, res) {
   fs.readFile( __dirname + "/" + "solve_group.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   }); 
})

app.post('/addSolveGroup', urlencodedParser, function (req, res) {
   var index = req.body.id - 1;
   var response = {
       id:req.body.id,
       solve_group:req.body.solve_group     
   };
   fs.readFile( __dirname + "/" + "solve_group.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/solve_group');
        } else {
        obj = JSON.parse(data);
        obj[index] = response;
        fs.writeFileSync('solve_group.json', JSON.stringify(obj));
        res.redirect('/solve_group');   
        }
   });
   
   
})

app.post('/deleteSolveGroup', urlencodedParser, function (req, res) {
    var index = req.body.id - 1;
    fs.readFile( __dirname + "/" + "solve_group.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/solve_group');
        } else {
        obj = JSON.parse(data);
        obj.splice(index, 1);
        //delete obj[index];

        fs.writeFileSync('solve_group.json', JSON.stringify(obj));
        res.redirect('/solve_group');   
        }
   });
})

/* Report API */
app.get('/report', function (req, res) {
   res.sendFile( __dirname + "/" + "report.html");
})

app.get('/listReport', function (req, res) {
   fs.readFile( __dirname + "/" + "report.json", 'utf8', function (err, data) {
       res.end( data );
   }); 
})

app.post('/addReport', urlencodedParser, function (req, res) {
   var index = req.body.id - 1;
   var response = {
       id:req.body.id,
       name:req.body.name,
       columns:req.body.columns,
       column1:req.body.column1,
       column1heading:req.body.column1heading,
       column2:req.body.column2,
       column2heading:req.body.column2heading,
       column3:req.body.column3,
       column3heading:req.body.column3heading,
       column4:req.body.column4,
       column4heading:req.body.column4heading,
       column5:req.body.column5,
       column5heading:req.body.column5heading    
   };
   fs.readFile( __dirname + "/" + "report.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/report');
        } else {
        obj = JSON.parse(data);
        obj[index] = response;
        fs.writeFileSync('report.json', JSON.stringify(obj));
        res.redirect('/report');   
        }
   });
   
   
})

app.post('/updateReport', urlencodedParser, function (req, res) {
        //console.log(req.body);
        var getKeys = function(obj){
            var keys = [];
            for (var key in obj){
                keys.push(key);
            }
            return keys
        }
        var gotKeys = getKeys(req.body);
        //console.log("gotKeys: " + gotKeys);

    var reportID = req.body.id;
    var reportData = req.body;
    //console.log("The reportID is: " + reportID);
    
   fs.readFile( __dirname + "/" + "report.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
        // obj = data;
        obj = JSON.parse(data);
        obj[reportID] = reportData;
        //console.log(reportData);
        fs.writeFileSync('report.json', JSON.stringify(obj, null, 4));
        res.redirect('/');   
        }
   });
   
   
})

app.post('/deleteReport', urlencodedParser, function (req, res) {
    var index = req.body.id - 1;
    fs.readFile( __dirname + "/" + "report.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/report');
        } else {
        obj = JSON.parse(data);
        obj.splice(index, 1);
        //delete obj[index];

        fs.writeFileSync('report.json', JSON.stringify(obj));
        res.redirect('/report');   
        }
   });
})

/* Data Category API */
app.get('/data_category', function (req, res) {
   res.sendFile( __dirname + "/" + "data_category.html");
})

app.get('/listDataCategories', function (req, res) {
   fs.readFile( __dirname + "/" + "data_category.json", 'utf8', function (err, data) {
       res.end( data );
   }); 
})

app.post('/addDataCategory', urlencodedParser, function (req, res) {
   var index = req.body.id - 1;
   var response = {
       id:req.body.id,
       name:req.body.name,
       data_type:req.body.data_type     
   };
   fs.readFile( __dirname + "/" + "data_category.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/data_category');
        } else {
        obj = JSON.parse(data);
        obj[index] = response;
        fs.writeFileSync('data_category.json', JSON.stringify(obj));
        res.redirect('/data_category');   
        }
   });
   
   
})

app.post('/deleteDataCategory', urlencodedParser, function (req, res) {
    var index = req.body.id - 1;
    fs.readFile( __dirname + "/" + "data_category.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/data_category');
        } else {
        obj = JSON.parse(data);
        obj.splice(index, 1);
        //delete obj[index];

        fs.writeFileSync('data_category.json', JSON.stringify(obj));
        res.redirect('/data_category');   
        }
   });
})

/* Create Report API */

app.get('/create_report', function (req, res) {
   res.sendFile( __dirname + "/" + "create_report.html");
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})