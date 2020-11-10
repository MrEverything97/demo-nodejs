//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

//set dynamic views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
//set public folder as static folder for static file
app.use(express.static('public'));

const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');


//Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'node-demo'
});

//connect to database
db.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
});

app.use(bodyParser.urlencoded({ extended: false }));

//route for home page
app.get('/',(req, res) => {
    //render index.hbs file
    res.render('index',{
        name : "MrEverything"
    });
});




//route for showing form
app.get('/post',(req, res) => {
    //render form.hbs file
    res.render('form');
});

//route for submit form by using post method
app.post('/post',(req, res) => {
    //render file form.hbs
    res.render('index',{
        //get value from textname
        name : req.body.textname
    });
});

//route for home with params name
app.get('/users',(req, res) => {
    let sql = "SELECT * FROM demo";
    let query = db.query(sql, (err, users) => {
        if(err) throw err;
        res.render('list',{
            users: users
        });
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
app.get('/users/create',(req, res) => {
    res.render('create');
});

app.post('/users',(req, res) => {
    let name = req.body.name;
    let data = {name: name};
    let sql = "INSERT INTO demo SET ?";
    let query = db.query(sql, data, (err, results) => {
        if(err) throw err;
        res.redirect(`/users`);

    });
});
app.get('/users/update/:id',(req, res) => {
    let sql = "SELECT * FROM demo WHERE id="+req.params.id+"";
    let query = db.query(sql, (err, user) => {
        if(err) throw err;
        res.render('update',{
            user: user
        });
    });
});
app.post('/update',(req, res) => {
    let sql = "UPDATE demo SET `name`= '"+req.body.name+"' WHERE id="+req.body.id+"";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/users');
    });
});

//route for delete data
app.get('/delete/:id',(req, res) => {
    let sql = "DELETE FROM demo WHERE id="+req.params.id+"";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/users');
    });
});

