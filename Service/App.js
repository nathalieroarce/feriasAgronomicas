
var pg = require('pg');
var conString = "postgres://postgres:12345@localhost:5432/devesa_app";
var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var cn = {host: "", port: 5432, database: 'agriculturalFairs', user: 'postgres', password: 'postgresql2017'};
var db = pgp(cn);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
});


app.get('/getProductsByEnterpriseID', function(req,res)
{    
    db.func('sp_getProductsByEnterpriseID', [req.query.id])
    .then(data => {res.end(JSON.stringify(data.sp_crearinforme));})
    .catch(error=> { res.status(400).send({message:0});})
});

app.post('/registerProduct', function(req,res)
{
    db.func('', [req.query.id])
    .then(data => {res.end(JSON.stringify(data.sp_crearinforme));})
    .catch(error=> { res.status(400).send({message:0});})
});

app.post('/registerEntity', function(req,res)
{
    db.func('', [req.query.id])
    .then(data => {res.end(JSON.stringify(data.sp_crearinforme));})
    .catch(error=> { res.status(400).send({message:0});})
});



var server = app.listen(8081, function ()
{
	var host = server.address().address;
	var port = server.address().port;
  console.log(" app listening at http://%s:%s", host, port);
});


/*
const express = require('express')
const path = require('path')
const http =  require('http');
const PORT = process.env.PORT || 5000

var app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('View', path.join(__dirname, 'View'))
 //  .get('/', (req, res) => res.render('service/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

const { BD } = require('pg');
const bd = new BD({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});



app.get('/getProductsByEnterpriseID', async (req, res) => {
    try {
        const client = await bd.connect()
        const result = await client.query('select sp_getProductsByEnterpriseID(1)');
        res.render('View/prueba', result);
        return result;
        //client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

*/
