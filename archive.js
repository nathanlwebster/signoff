'use strict';

$(function(){
	
    var model = {
        
        getAll: function(){
            $.getJSON('status.json', function(data){
                   model.currentID = data.length;
                   controller.passData(data);
            });
        },
        addStatus: function(){
            var nextID = model.currentID + 1;
            console.log(model.currentID + 1);
            var data = '{"id":"' + nextID + '","Description":"' + view.value + '"}';
            console.log(data);
            $.post('status.json', data, function(){
                console.log("Data was posted.");
            });
        }

    };

	var view = {
        renderRow: function(obj){
            $("#statusTable").append("<tr><td>" + obj + "</td></tr>");
        },
        addRow: function(){
            $("#status_submit").click(function(){
                view.value = ($("#status").val());
                controller.newStatus();
            });
        }
    };

	var controller = {
        passData: function(tableData){
            $.each(tableData, function(key, value){
                view.renderRow(value.Description); 
            });    
        },
        newStatus: function(){
            model.addStatus();
        }
    };
    
   model.getAll();
   view.addRow();
});


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

app.service('prepRows', function() {
    this.myFunc = function (data) {
        console.log("This is the data passed to prepRows: " + data);
        var len = data.length;
        console.log("This is data[0]: " + data[0]);
        var numRows = data[0].rows.length;
        //console.log("Number of rows: " + numRows);
        console.log("This is data[0].rows[0].col1val: " + data[0].rows[0].col1val);
        var newRows = [];
        
        




        var n = 0;
        while (n < numRows) {
            newRows[n] = {};
            var i = 0;
            while (i < len) {
            var concatName = "";
            var j = i + 1;
            concatName = "col" + j + "val";
            newRows[n][i] = data[0].rows[n][concatName];
            i++;
            }
        //console.log("newRows is: " + newRows);
        n++;

        }
        console.log("This is newRows[0][0]: " + newRows[0][0]);
        return newRows;
    }
});


// report.json generator

[
  '{{repeat(5, 7)}}',
  {
    id: '{{index()}}',
    name: '{{firstName()}}',
    columns: '{{integer(1, 5)}}',
    column1: 'column1',
    column1heading: 'Column 1',
    column2: 'column2',
    column2heading: 'Column 2',
    column3: 'column3',
    column3heading: 'Column 3',
    column4: 'column4',
    column4heading: 'Column 4',
    column5: 'column5',
    column5heading: 'Column 5',
    rows: [
      '{{repeat(30)}}',
      {
        id: '{{index()}}',
        col1val: '{{company()}}',
        col2val: '',
        col3val: '',
        col4val: '',
        col5val: '',
        col1type: 'text',
        col2type: 'select',
        col3type: 'checkbox',
        col4type: 'text',
        col5type: 'text'
      }
    ]    
  }
]


/* Old report.json data */

[
    {
        "id": 0,
        "name": "Chris",
        "columns": 2,
        "column1": "column1",
        "column1heading": "column1heading",
        "column2": "column2",
        "column2heading": "column2heading",
        "column3": "column3",
        "column3heading": "column3heading",
        "column4": "column4",
        "column4heading": "column4heading",
        "column5": "column5",
        "column5heading": "column5heading",
        "rows": [
            {
                "id": 0,
                "col1val": "Applidec",
                "col2val": "Combot",
                "col3val": "Delphide",
                "col4val": "Vetron",
                "col5val": "Tropolis"
            },
            {
                "id": 1,
                "col1val": "Pigzart",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 2,
                "col1val": "Nitracyr",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 3,
                "col1val": "Progenex",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 4,
                "col1val": "Elemantra",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 5,
                "col1val": "Kengen",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 6,
                "col1val": "Beadzza",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 7,
                "col1val": "Permadyne",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 8,
                "col1val": "Memora",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 9,
                "col1val": "Updat",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 10,
                "col1val": "Ziore",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 11,
                "col1val": "Zomboid",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 12,
                "col1val": "Snorus",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 13,
                "col1val": "Dancity",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 14,
                "col1val": "Oatfarm",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 15,
                "col1val": "Zillidium",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 16,
                "col1val": "Calcula",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 17,
                "col1val": "Zentia",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 18,
                "col1val": "Phuel",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 19,
                "col1val": "Uncorp",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 20,
                "col1val": "Jimbies",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 21,
                "col1val": "Tetratrex",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 22,
                "col1val": "Aclima",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 23,
                "col1val": "Securia",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 24,
                "col1val": "Elentrix",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 25,
                "col1val": "Calcu",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 26,
                "col1val": "Aquasure",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 27,
                "col1val": "Minga",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 28,
                "col1val": "Irack",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            },
            {
                "id": 29,
                "col1val": "Conjurica",
                "col2val": "Sign",
                "col3val": "Yes/No",
                "col4val": "User",
                "col5val": "User"
            }
        ]
    },
    {
        "id": 1,
        "name": "Nina",
        "columns": 1,
        "column1": "column1",
        "column1heading": "column1heading",
        "column2": "column2",
        "column2heading": "column2heading",
        "column3": "column3",
        "column3heading": "column3heading",
        "column4": "column4",
        "column4heading": "column4heading",
        "column5": "column5",
        "column5heading": "column5heading",
        "rows": [
            {
                "id": 0,
                "col1val": "Protodyne",
                "col2val": "Slofast",
                "col3val": "Netility",
                "col4val": "Zillatide",
                "col5val": "Namebox"
            },
            {
                "id": 1,
                "col1val": "Anixang",
                "col2val": "Essensia",
                "col3val": "Isotrack",
                "col4val": "Lingoage",
                "col5val": "Koogle"
            },
            {
                "id": 2,
                "col1val": "Plasto",
                "col2val": "Ewaves",
                "col3val": "Microluxe",
                "col4val": "Gushkool",
                "col5val": "Oceanica"
            },
            {
                "id": 3,
                "col1val": "Zidox",
                "col2val": "Dragbot",
                "col3val": "Homelux",
                "col4val": "Zillactic",
                "col5val": "Qualitern"
            },
            {
                "id": 4,
                "col1val": "Venoflex",
                "col2val": "Zaya",
                "col3val": "Steeltab",
                "col4val": "Perkle",
                "col5val": "Klugger"
            },
            {
                "id": 5,
                "col1val": "Podunk",
                "col2val": "Geoform",
                "col3val": "Automon",
                "col4val": "Apexia",
                "col5val": "Visualix"
            },
            {
                "id": 6,
                "col1val": "Ronbert",
                "col2val": "Frosnex",
                "col3val": "Xoggle",
                "col4val": "Coash",
                "col5val": "Zerology"
            },
            {
                "id": 7,
                "col1val": "Quizka",
                "col2val": "Medcom",
                "col3val": "Premiant",
                "col4val": "Equitox",
                "col5val": "Photobin"
            },
            {
                "id": 8,
                "col1val": "Satiance",
                "col2val": "Kyagoro",
                "col3val": "Telepark",
                "col4val": "Ginkle",
                "col5val": "Poochies"
            },
            {
                "id": 9,
                "col1val": "Polarium",
                "col2val": "Zorromop",
                "col3val": "Accusage",
                "col4val": "Namegen",
                "col5val": "Senmao"
            },
            {
                "id": 10,
                "col1val": "Zenco",
                "col2val": "Krog",
                "col3val": "Baluba",
                "col4val": "Bugsall",
                "col5val": "Scenty"
            },
            {
                "id": 11,
                "col1val": "Centice",
                "col2val": "Autograte",
                "col3val": "Rodeocean",
                "col4val": "Crustatia",
                "col5val": "Singavera"
            },
            {
                "id": 12,
                "col1val": "Extremo",
                "col2val": "Dadabase",
                "col3val": "Qualitex",
                "col4val": "Enersol",
                "col5val": "Sportan"
            },
            {
                "id": 13,
                "col1val": "Daycore",
                "col2val": "Opportech",
                "col3val": "Zilodyne",
                "col4val": "Zaggle",
                "col5val": "Ecraze"
            },
            {
                "id": 14,
                "col1val": "Soprano",
                "col2val": "Rocklogic",
                "col3val": "Paprikut",
                "col4val": "Isis",
                "col5val": "Jasper"
            },
            {
                "id": 15,
                "col1val": "Avit",
                "col2val": "Geekular",
                "col3val": "Tasmania",
                "col4val": "Xsports",
                "col5val": "Utara"
            },
            {
                "id": 16,
                "col1val": "Sustenza",
                "col2val": "Bristo",
                "col3val": "Orbixtar",
                "col4val": "Quizmo",
                "col5val": "Lunchpad"
            },
            {
                "id": 17,
                "col1val": "Parleynet",
                "col2val": "Datacator",
                "col3val": "Injoy",
                "col4val": "Enormo",
                "col5val": "Bitrex"
            },
            {
                "id": 18,
                "col1val": "Viagreat",
                "col2val": "Acusage",
                "col3val": "Techade",
                "col4val": "Xixan",
                "col5val": "Inrt"
            },
            {
                "id": 19,
                "col1val": "Micronaut",
                "col2val": "Limage",
                "col3val": "Yurture",
                "col4val": "Stockpost",
                "col5val": "Mantro"
            },
            {
                "id": 20,
                "col1val": "Rodemco",
                "col2val": "Ronelon",
                "col3val": "Gluid",
                "col4val": "Handshake",
                "col5val": "Isoplex"
            },
            {
                "id": 21,
                "col1val": "Zanymax",
                "col2val": "Architax",
                "col3val": "Insurity",
                "col4val": "Roughies",
                "col5val": "Pyramis"
            },
            {
                "id": 22,
                "col1val": "Inquala",
                "col2val": "Bullzone",
                "col3val": "Medicroix",
                "col4val": "Sentia",
                "col5val": "Kaggle"
            },
            {
                "id": 23,
                "col1val": "Suretech",
                "col2val": "Plasmosis",
                "col3val": "Gracker",
                "col4val": "Motovate",
                "col5val": "Orboid"
            },
            {
                "id": 24,
                "col1val": "Genmom",
                "col2val": "Lyrichord",
                "col3val": "Zosis",
                "col4val": "Comveyer",
                "col5val": "Eventix"
            },
            {
                "id": 25,
                "col1val": "Zaphire",
                "col2val": "Netplax",
                "col3val": "Naxdis",
                "col4val": "Quarx",
                "col5val": "Nurali"
            },
            {
                "id": 26,
                "col1val": "Edecine",
                "col2val": "Corporana",
                "col3val": "Liquicom",
                "col4val": "Surelogic",
                "col5val": "Gadtron"
            },
            {
                "id": 27,
                "col1val": "Emtrak",
                "col2val": "Mondicil",
                "col3val": "Gorganic",
                "col4val": "Andryx",
                "col5val": "Vortexaco"
            },
            {
                "id": 28,
                "col1val": "Puria",
                "col2val": "Inear",
                "col3val": "Amtas",
                "col4val": "Zentry",
                "col5val": "Emtrac"
            },
            {
                "id": 29,
                "col1val": "Hivedom",
                "col2val": "Supremia",
                "col3val": "Rooforia",
                "col4val": "Quonk",
                "col5val": "Ecstasia"
            }
        ]
    },
    {
        "id": 2,
        "name": "Mcintosh",
        "columns": 4,
        "column1": "column1",
        "column1heading": "column1heading",
        "column2": "column2",
        "column2heading": "column2heading",
        "column3": "column3",
        "column3heading": "column3heading",
        "column4": "column4",
        "column4heading": "column4heading",
        "column5": "column5",
        "column5heading": "column5heading",
        "rows": [
            {
                "id": 0,
                "col1val": "Geekology",
                "col2val": "Unisure",
                "col3val": "Zillan",
                "col4val": "Valreda",
                "col5val": "Caxt"
            },
            {
                "id": 1,
                "col1val": "Rodeology",
                "col2val": "Kog",
                "col3val": "Fitcore",
                "col4val": "Flumbo",
                "col5val": "Recrisys"
            },
            {
                "id": 2,
                "col1val": "Mangelica",
                "col2val": "Aeora",
                "col3val": "Assistix",
                "col4val": "Enjola",
                "col5val": "Portaline"
            },
            {
                "id": 3,
                "col1val": "Sensate",
                "col2val": "Zerbina",
                "col3val": "Kongle",
                "col4val": "Ecrater",
                "col5val": "Isologics"
            },
            {
                "id": 4,
                "col1val": "Kage",
                "col2val": "Iplax",
                "col3val": "Squish",
                "col4val": "Gallaxia",
                "col5val": "Accuprint"
            },
            {
                "id": 5,
                "col1val": "Realysis",
                "col2val": "Noralex",
                "col3val": "Zogak",
                "col4val": "Quordate",
                "col5val": "Octocore"
            },
            {
                "id": 6,
                "col1val": "Exoswitch",
                "col2val": "Harmoney",
                "col3val": "Telequiet",
                "col4val": "Koffee",
                "col5val": "Cyclonica"
            },
            {
                "id": 7,
                "col1val": "Hairport",
                "col2val": "Vinch",
                "col3val": "Bunga",
                "col4val": "Tingles",
                "col5val": "Elita"
            },
            {
                "id": 8,
                "col1val": "Retrack",
                "col2val": "Isologix",
                "col3val": "Tellifly",
                "col4val": "Maineland",
                "col5val": "Endipin"
            },
            {
                "id": 9,
                "col1val": "Enaut",
                "col2val": "Zinca",
                "col3val": "Furnigeer",
                "col4val": "Orbean",
                "col5val": "Softmicro"
            },
            {
                "id": 10,
                "col1val": "Sureplex",
                "col2val": "Geekosis",
                "col3val": "Idego",
                "col4val": "Telpod",
                "col5val": "Assurity"
            },
            {
                "id": 11,
                "col1val": "Skyplex",
                "col2val": "Dogtown",
                "col3val": "Oronoko",
                "col4val": "Fishland",
                "col5val": "Medalert"
            },
            {
                "id": 12,
                "col1val": "Gogol",
                "col2val": "Fangold",
                "col3val": "Mazuda",
                "col4val": "Xerex",
                "col5val": "Eweville"
            },
            {
                "id": 13,
                "col1val": "Izzby",
                "col2val": "Qot",
                "col3val": "Ovium",
                "col4val": "Adornica",
                "col5val": "Eschoir"
            },
            {
                "id": 14,
                "col1val": "Remold",
                "col2val": "Melbacor",
                "col3val": "Apextri",
                "col4val": "Apex",
                "col5val": "Hatology"
            },
            {
                "id": 15,
                "col1val": "Utarian",
                "col2val": "Digifad",
                "col3val": "Accidency",
                "col4val": "Egypto",
                "col5val": "Zytrax"
            },
            {
                "id": 16,
                "col1val": "Songlines",
                "col2val": "Cuizine",
                "col3val": "Dreamia",
                "col4val": "Insuresys",
                "col5val": "Xinware"
            },
            {
                "id": 17,
                "col1val": "Futuris",
                "col2val": "Zolarity",
                "col3val": "Globoil",
                "col4val": "Waretel",
                "col5val": "Exiand"
            },
            {
                "id": 18,
                "col1val": "Genmy",
                "col2val": "Cemention",
                "col3val": "Eyeris",
                "col4val": "Eternis",
                "col5val": "Kidstock"
            },
            {
                "id": 19,
                "col1val": "Cincyr",
                "col2val": "Geofarm",
                "col3val": "Isopop",
                "col4val": "Isonus",
                "col5val": "Emergent"
            },
            {
                "id": 20,
                "col1val": "Viocular",
                "col2val": "Acrodance",
                "col3val": "Insource",
                "col4val": "Overfork",
                "col5val": "Bicol"
            },
            {
                "id": 21,
                "col1val": "Quarex",
                "col2val": "Icology",
                "col3val": "Cowtown",
                "col4val": "Brainquil",
                "col5val": "Lovepad"
            },
            {
                "id": 22,
                "col1val": "Artiq",
                "col2val": "Brainclip",
                "col3val": "Geekus",
                "col4val": "Centrexin",
                "col5val": "Zensure"
            },
            {
                "id": 23,
                "col1val": "Newcube",
                "col2val": "Plutorque",
                "col3val": "Bedder",
                "col4val": "Nipaz",
                "col5val": "Poshome"
            },
            {
                "id": 24,
                "col1val": "Comtext",
                "col2val": "Exovent",
                "col3val": "Cablam",
                "col4val": "Comvene",
                "col5val": "Tubesys"
            },
            {
                "id": 25,
                "col1val": "Malathion",
                "col2val": "Skinserve",
                "col3val": "Enerforce",
                "col4val": "Imageflow",
                "col5val": "Recognia"
            },
            {
                "id": 26,
                "col1val": "Blurrybus",
                "col2val": "Affluex",
                "col3val": "Digial",
                "col4val": "Techmania",
                "col5val": "Tetak"
            },
            {
                "id": 27,
                "col1val": "Eclipsent",
                "col2val": "Zytrek",
                "col3val": "Buzzworks",
                "col4val": "Illumity",
                "col5val": "Peticular"
            },
            {
                "id": 28,
                "col1val": "Terascape",
                "col2val": "Qnekt",
                "col3val": "Endipine",
                "col4val": "Polarax",
                "col5val": "Applideck"
            },
            {
                "id": 29,
                "col1val": "Providco",
                "col2val": "Ovolo",
                "col3val": "Qiao",
                "col4val": "Electonic",
                "col5val": "Mediot"
            }
        ]
    },
    {
        "id": 3,
        "name": "Enid",
        "columns": 4,
        "column1": "column1",
        "column1heading": "column1heading",
        "column2": "column2",
        "column2heading": "column2heading",
        "column3": "column3",
        "column3heading": "column3heading",
        "column4": "column4",
        "column4heading": "column4heading",
        "column5": "column5",
        "column5heading": "column5heading",
        "rows": [
            {
                "id": 0,
                "col1val": "Equitax",
                "col2val": "Kegular",
                "col3val": "Marvane",
                "col4val": "Enomen",
                "col5val": "Virxo"
            },
            {
                "id": 1,
                "col1val": "Slax",
                "col2val": "Fibrodyne",
                "col3val": "Bizmatic",
                "col4val": "Cosmetex",
                "col5val": "Norali"
            },
            {
                "id": 2,
                "col1val": "Buzzmaker",
                "col2val": "Comstar",
                "col3val": "Vertide",
                "col4val": "Undertap",
                "col5val": "Eplosion"
            },
            {
                "id": 3,
                "col1val": "Comtrek",
                "col2val": "Slumberia",
                "col3val": "Opticall",
                "col4val": "Zanity",
                "col5val": "Zoxy"
            },
            {
                "id": 4,
                "col1val": "Enquility",
                "col2val": "Corepan",
                "col3val": "Chorizon",
                "col4val": "Sonique",
                "col5val": "Phormula"
            },
            {
                "id": 5,
                "col1val": "Gazak",
                "col2val": "Lexicondo",
                "col3val": "Makingway",
                "col4val": "Columella",
                "col5val": "Confrenzy"
            },
            {
                "id": 6,
                "col1val": "Glasstep",
                "col2val": "Zappix",
                "col3val": "Metroz",
                "col4val": "Eclipto",
                "col5val": "Cormoran"
            },
            {
                "id": 7,
                "col1val": "Turnabout",
                "col2val": "Medesign",
                "col3val": "Ramjob",
                "col4val": "Rugstars",
                "col5val": "Earthpure"
            },
            {
                "id": 8,
                "col1val": "Snacktion",
                "col2val": "Zidant",
                "col3val": "Isodrive",
                "col4val": "Insurety",
                "col5val": "Exposa"
            },
            {
                "id": 9,
                "col1val": "Isoternia",
                "col2val": "Teraprene",
                "col3val": "Buzzness",
                "col4val": "Panzent",
                "col5val": "Thredz"
            },
            {
                "id": 10,
                "col1val": "Firewax",
                "col2val": "Otherway",
                "col3val": "Tourmania",
                "col4val": "Voratak",
                "col5val": "Snowpoke"
            },
            {
                "id": 11,
                "col1val": "Plasmos",
                "col2val": "Intrawear",
                "col3val": "Prosely",
                "col4val": "Moltonic",
                "col5val": "Musaphics"
            },
            {
                "id": 12,
                "col1val": "Powernet",
                "col2val": "Splinx",
                "col3val": "Velity",
                "col4val": "Netropic",
                "col5val": "Rotodyne"
            },
            {
                "id": 13,
                "col1val": "Geeketron",
                "col2val": "Chillium",
                "col3val": "Myopium",
                "col4val": "Fortean",
                "col5val": "Entroflex"
            },
            {
                "id": 14,
                "col1val": "Webiotic",
                "col2val": "Netplode",
                "col3val": "Bedlam",
                "col4val": "Elpro",
                "col5val": "Ecratic"
            },
            {
                "id": 15,
                "col1val": "Geologix",
                "col2val": "Magnafone",
                "col3val": "Cedward",
                "col4val": "Exostream",
                "col5val": "Darwinium"
            },
            {
                "id": 16,
                "col1val": "Canopoly",
                "col2val": "Tersanki",
                "col3val": "Acium",
                "col4val": "Inventure",
                "col5val": "Grainspot"
            },
            {
                "id": 17,
                "col1val": "Shadease",
                "col2val": "Musanpoly",
                "col3val": "Nspire",
                "col4val": "Ovation",
                "col5val": "Multiflex"
            },
            {
                "id": 18,
                "col1val": "Indexia",
                "col2val": "Interodeo",
                "col3val": "Zilphur",
                "col4val": "Enersave",
                "col5val": "Aquoavo"
            },
            {
                "id": 19,
                "col1val": "Flexigen",
                "col2val": "Eargo",
                "col3val": "Escenta",
                "col4val": "Portalis",
                "col5val": "Voipa"
            },
            {
                "id": 20,
                "col1val": "Miracula",
                "col2val": "Concility",
                "col3val": "Jumpstack",
                "col4val": "Solgan",
                "col5val": "Corecom"
            },
            {
                "id": 21,
                "col1val": "Ezentia",
                "col2val": "Anarco",
                "col3val": "Kyaguru",
                "col4val": "Imperium",
                "col5val": "Retrotex"
            },
            {
                "id": 22,
                "col1val": "Isoswitch",
                "col2val": "Momentia",
                "col3val": "Ziggles",
                "col4val": "Atgen",
                "col5val": "Visalia"
            },
            {
                "id": 23,
                "col1val": "Xymonk",
                "col2val": "Genekom",
                "col3val": "Songbird",
                "col4val": "Mobildata",
                "col5val": "Biflex"
            },
            {
                "id": 24,
                "col1val": "Geekola",
                "col2val": "Accruex",
                "col3val": "Zoid",
                "col4val": "Opticom",
                "col5val": "Strozen"
            },
            {
                "id": 25,
                "col1val": "Cognicode",
                "col2val": "Magmina",
                "col3val": "Capscreen",
                "col4val": "Zeam",
                "col5val": "Kongene"
            },
            {
                "id": 26,
                "col1val": "Ersum",
                "col2val": "Konnect",
                "col3val": "Comtrail",
                "col4val": "Futurity",
                "col5val": "Exerta"
            },
            {
                "id": 27,
                "col1val": "Gynko",
                "col2val": "Organica",
                "col3val": "Tropoli",
                "col4val": "Farmex",
                "col5val": "Zork"
            },
            {
                "id": 28,
                "col1val": "Eventage",
                "col2val": "Orbalix",
                "col3val": "Talae",
                "col4val": "Duflex",
                "col5val": "Emoltra"
            },
            {
                "id": 29,
                "col1val": "Furnafix",
                "col2val": "Farmage",
                "col3val": "Talkalot",
                "col4val": "Exospeed",
                "col5val": "Zuvy"
            }
        ]
    },
    {
        "id": 4,
        "name": "Stein",
        "columns": 3,
        "column1": "column1",
        "column1heading": "column1heading",
        "column2": "column2",
        "column2heading": "column2heading",
        "column3": "column3",
        "column3heading": "column3heading",
        "column4": "column4",
        "column4heading": "column4heading",
        "column5": "column5",
        "column5heading": "column5heading",
        "rows": [
            {
                "id": 0,
                "col1val": "Genesynk",
                "col2val": "Liquidoc",
                "col3val": "Combogene",
                "col4val": "Billmed",
                "col5val": "Nexgene"
            },
            {
                "id": 1,
                "col1val": "Marqet",
                "col2val": "Cytrak",
                "col3val": "Comtrak",
                "col4val": "Dognost",
                "col5val": "Exoplode"
            },
            {
                "id": 2,
                "col1val": "Nebulean",
                "col2val": "Netagy",
                "col3val": "Bitendrex",
                "col4val": "Envire",
                "col5val": "Signity"
            },
            {
                "id": 3,
                "col1val": "Isbol",
                "col2val": "Dentrex",
                "col3val": "Bolax",
                "col4val": "Besto",
                "col5val": "Multron"
            },
            {
                "id": 4,
                "col1val": "Toyletry",
                "col2val": "Glukgluk",
                "col3val": "Dymi",
                "col4val": "Flotonic",
                "col5val": "Pulze"
            },
            {
                "id": 5,
                "col1val": "Zenthall",
                "col2val": "Insuron",
                "col3val": "Quadeebo",
                "col4val": "Parcoe",
                "col5val": "Lyria"
            },
            {
                "id": 6,
                "col1val": "Terragen",
                "col2val": "Musix",
                "col3val": "Ebidco",
                "col4val": "Datagene",
                "col5val": "Kneedles"
            },
            {
                "id": 7,
                "col1val": "Luxuria",
                "col2val": "Datagen",
                "col3val": "Earthwax",
                "col4val": "Dogspa",
                "col5val": "Radiantix"
            },
            {
                "id": 8,
                "col1val": "Aquacine",
                "col2val": "Reversus",
                "col3val": "Zolarex",
                "col4val": "Comfirm",
                "col5val": "Quinex"
            },
            {
                "id": 9,
                "col1val": "Rodeomad",
                "col2val": "Zedalis",
                "col3val": "Zillar",
                "col4val": "Signidyne",
                "col5val": "Imaginart"
            },
            {
                "id": 10,
                "col1val": "Speedbolt",
                "col2val": "Grok",
                "col3val": "Kinetica",
                "col4val": "Applica",
                "col5val": "Keengen"
            },
            {
                "id": 11,
                "col1val": "Extragen",
                "col2val": "Intradisk",
                "col3val": "Maxemia",
                "col4val": "Quilk",
                "col5val": "Supportal"
            },
            {
                "id": 12,
                "col1val": "Locazone",
                "col2val": "Zentility",
                "col3val": "Accufarm",
                "col4val": "Gonkle",
                "col5val": "Assitia"
            },
            {
                "id": 13,
                "col1val": "Zillacom",
                "col2val": "Comtours",
                "col3val": "Temorak",
                "col4val": "Silodyne",
                "col5val": "Zilladyne"
            },
            {
                "id": 14,
                "col1val": "Optique",
                "col2val": "Zepitope",
                "col3val": "Vendblend",
                "col4val": "Bittor",
                "col5val": "Greeker"
            },
            {
                "id": 15,
                "col1val": "Miraclis",
                "col2val": "Hawkster",
                "col3val": "Proxsoft",
                "col4val": "Balooba",
                "col5val": "Trollery"
            },
            {
                "id": 16,
                "col1val": "Twiggery",
                "col2val": "Printspan",
                "col3val": "Interfind",
                "col4val": "Hinway",
                "col5val": "Quintity"
            },
            {
                "id": 17,
                "col1val": "Corpulse",
                "col2val": "Schoolio",
                "col3val": "Joviold",
                "col4val": "Sealoud",
                "col5val": "Terrago"
            },
            {
                "id": 18,
                "col1val": "Digitalus",
                "col2val": "Deminimum",
                "col3val": "Omatom",
                "col4val": "Veraq",
                "col5val": "Hydrocom"
            },
            {
                "id": 19,
                "col1val": "Maroptic",
                "col2val": "Idealis",
                "col3val": "Olympix",
                "col4val": "Zillanet",
                "col5val": "Xplor"
            },
            {
                "id": 20,
                "col1val": "Cinaster",
                "col2val": "Ozean",
                "col3val": "Danja",
                "col4val": "Decratex",
                "col5val": "Magnemo"
            },
            {
                "id": 21,
                "col1val": "Vantage",
                "col2val": "Freakin",
                "col3val": "Verton",
                "col4val": "Comveyor",
                "col5val": "Pyrami"
            },
            {
                "id": 22,
                "col1val": "Isostream",
                "col2val": "Bluegrain",
                "col3val": "Maximind",
                "col4val": "Kindaloo",
                "col5val": "Kozgene"
            },
            {
                "id": 23,
                "col1val": "Geekol",
                "col2val": "Rockyard",
                "col3val": "Aquamate",
                "col4val": "Avenetro",
                "col5val": "Ultrasure"
            },
            {
                "id": 24,
                "col1val": "Marketoid",
                "col2val": "Sulfax",
                "col3val": "Renovize",
                "col4val": "Asimiline",
                "col5val": "Accupharm"
            },
            {
                "id": 25,
                "col1val": "Filodyne",
                "col2val": "Limozen",
                "col3val": "Talkola",
                "col4val": "Zoarere",
                "col5val": "Zentix"
            },
            {
                "id": 26,
                "col1val": "Qimonk",
                "col2val": "Magneato",
                "col3val": "Collaire",
                "col4val": "Kangle",
                "col5val": "Stelaecor"
            },
            {
                "id": 27,
                "col1val": "Diginetic",
                "col2val": "Zialactic",
                "col3val": "Aquasseur",
                "col4val": "Skybold",
                "col5val": "Dyno"
            },
            {
                "id": 28,
                "col1val": "Valpreal",
                "col2val": "Pharmacon",
                "col3val": "Quonata",
                "col4val": "Comvey",
                "col5val": "Digirang"
            },
            {
                "id": 29,
                "col1val": "Furnitech",
                "col2val": "Magnina",
                "col3val": "Interloo",
                "col4val": "Lotron",
                "col5val": "Biohab"
            }
        ]
    }
]