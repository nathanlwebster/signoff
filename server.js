var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'));

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
       columns:req.body.columns     
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