const express = require('express')
const path = require('path')
const http =  require('http');
const PORT = process.env.PORT || 5000

var app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('View', path.join(__dirname, 'View'))
 //  .get('/', (req, res) => res.render('service/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


