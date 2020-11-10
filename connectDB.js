var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",

    database:"node-demo",
    user: "root",
    password: '12345'
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected...");
    con.query("SELECT * FROM demo", function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});
