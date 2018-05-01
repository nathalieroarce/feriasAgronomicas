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
