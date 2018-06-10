
var pg = require('pg');
var conString = "postgres://postgres:12345@localhost:5432/agriculturalfairs";
var client;
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));
var multer = require("multer");
var limits = { fileSize: 50 * 1024 * 1024 };

var productsBucketName='feriasagronomicasproductos';

var enterpriseBucketName='feriasagronomicasempresas';

var folderDirection= "./TemporalImages/";

var serviceUrl="https://storage.googleapis.com/";

/*
const storageMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './TemporalImages');
  },
  limits:limits
  ,
  filename: function (req, file, cb) {

    cb(null, Date.now()+ file.originalname + path.extname(file.originalname));
  }
});
*/

/*
const upload = multer({ storage: storageMulter }).single('image');
*/

var storage = multer.memoryStorage();
var upload = multer({ storage: storage }).single('image');

var pgp = require('pg-promise')();
var cn = {host: 'localhost', port: 5432, database: 'agriculturalfairs', user: 'postgres', password: '12345'};
var db = pgp(cn);



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
});



app.use(bodyParser.json({limit: '50mb'}));
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000 }));


var storage = GoogleCloudStorage({
  projectId: '57822770845ad25617586e7afc5bab6054b3bccf',
  keyFilename: './feriasAgronomicas-key.json'
})



/******************************************************************

FUNCTION TO UPLOAD IMAGE

*******************************************************************/
function uploadToService(fileInformation,toBucket,callback){
				var BUCKET_NAME = toBucket;
				var myBucket = storage.bucket(BUCKET_NAME);

				var file = myBucket.file(fileInformation.filename);

				let localFileLocation = folderDirection +fileInformation.filename;
				myBucket.uploadAsync(localFileLocation, { public: true },function(err, file){

					if (err){
						//error ocurred
			    		callback({response: false, imageUrl:serviceUrl+BUCKET_NAME+"/"+fileInformation.filename});
					}
					else{
						//aqui va el procedimiento almacenado
						//file saved

						callback({response: true, imageUrl:serviceUrl+BUCKET_NAME+"/"+fileInformation.filename});
					}

				});
}

function uploadImageToService(coverImageData,originalName, mimeType, toBucket, callback) {

 
  var myBucket = storage.bucket(toBucket);
  // Generate a unique filename for this image
  var filename = '' + new Date().getTime() + "-" + Math.random() +path.extname(originalName);
  var file = myBucket.file(filename);
  var imageUrl = serviceUrl+ toBucket +"/"+ filename;
  var stream = file.createWriteStream(
  	{
    metadata: {
      contentType: mimeType
     } });
  stream.on('error', function(){ callback(true,null)});
  stream.on('finish', function() {
    // Set this file to be publicly readable
    console.log("archivo guardado");

    file.makePublic(function(err) {
      if (err){
      	 	console.log(err);
      	    callback(true,null);
  			}
  	   else{
  	   		callback(false,imageUrl);
  	   }		
      		
   	 });
   	
  	});

  stream.end(coverImageData);
}



function deleteImageFromLocal(imageUrl){
	//remove local image
    fs.unlink(imageUrl, (err) => {
         if (err) {
             throw err;
             console.log('error for deleted from local');
             }
         else{
             console.log('successfully deleted from local');
             }
       });
}



/************************************************
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

app.get('/getProductsTypes', async (req, res) => {
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


app.get('/doLogin',function(req,res){
	db.func('sp_doLogin',[req.query.enterpriseEmail, req.query.enterprisePassword])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data[0].sp_dologin } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})
})

app.post('/registerProduct',function(req,res)
{
	
	console.log("registrar Producto");
	upload(req,res, function (err) {
        if (err) {
            res.end(JSON.stringify({response:false,message: "El proceso de cargo de la imagen no fue exitoso"}));
        }
        else{

        	if (req.file) {
        		var coverImageData = req.file.buffer;

        		uploadImageToService(coverImageData,req.file.originalname, req.file.mimetype ,productsBucketName,function(error,imageUrl){
        			if (error===false){
        					//execute the store procedure

        					//1 is an enterprise
        					db.func('sp_insertProduct',[req.body.enterpriseID,req.body.name,req.body.code,req.body.price,req.body.unit,imageUrl,
        										req.body.productType, req.body.description, req.body.stock])
									.then(data => {
										console.log(data);
										res.end(JSON.stringify({"response" :data[0].sp_insertproduct}));
									})
		    						.catch(error=> {
		            					console.log("ERROR: ",error);
		        						res.end(JSON.stringify({ response:false}));
    										})

        				}

        				else{
        					res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue existoso"}));
        				}
        		});

        	
        	  }

			else{
				res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue existoso"}));

			}
		}

    });
	   

    });

app.post('/registerEnterprise',function(req,res)
{
	console.log("registrar empresa");
	upload(req,res, function (err) {
        if (err) {
            res.end(JSON.stringify({response:false,message: "El proceso de cargo de la imagen no fue exitoso"}));
        }
        else{

        	if (req.file) {
        		console.log(req.body);
        		//upload image to service
        		uploadToService(req.file,enterpriseBucketName,function(response){
        				if (response.response===true){
        					//execute the store procedure
        					
        					db.func('sp_insertEnterprise',[req.body.name,response.imageUrl,req.body.description,req.body.responsableName,
        							req.body.responsableIDCardNumber,req.body.email,req.body.password,req.body.telephoneNumber,req.body.expressService,
        							req.body.price,req.body.locationName,
        							"POINT("+ req.body.enterpriseDeliveryPointLocation.split(",")[0]+" "+req.body.enterpriseDeliveryPointLocation.split(",")[1]+")",
        							"POINT("+ req.body.enterpriseLocation.split(",")[0] +" "+req.body.enterpriseLocation.split(",")[1]+")"
        							])
									.then(data => {
										console.log(data);
										res.end(JSON.stringify({"response" :data[0].sp_insertenterprise}));
									})
		    						.catch(error=> {
		            					console.log("ERROR: ",error);
		        						res.end(JSON.stringify({ response:false}));
    										})

        				}


        				else{
        					res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue existoso"}));
        				}

        				deleteImageFromLocal(folderDirection+"/"+ req.file.filename);

        		})

        	  }

			else{
				res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue existoso"}));

			}
		}

    });

    });


app.get('/getProductTypes',function(req,res)
{
	db.func('sp_getProductTypes')
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});

app.get('/Error',function(req,res)
{
  res.end(JSON.stringify({response:false,"data":[]})); 
});


app.get('/getEnterpriseProducts',function(req,res)
{
	db.func('sp_getProductsByEnterpriseID',[req.query.enterpriseID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});

app.get('/getEnterprises',function(req,res)
{
	db.func('sp_getEnterprises')
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});

app.get('/getProductsByKey',function(req,res)
{
  console.log(req.query.key+ " " +req.query.enterpriseID);
	db.func('sp_getProductsByKey',[req.query.key,req.query.enterpriseID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})
});

app.get('/getPendingOrders',function(req,res)
{
	db.func('sp_getPendingOrders',[req.query.enterpriseID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});


app.get('/getSentOrders',function(req,res)
{
	db.func('sp_getSentOrders',[req.query.enterpriseID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});

app.get('/getPaidOrders',function(req,res)
{
	db.func('sp_getPaidOrders',[req.query.enterpriseID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});


app.post('/setPaid',function(req,res){

	db.func('sp_setPaid',[req.body.orderID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:data[0].sp_setpaid} ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false}));})
	})



app.post('/sendOrder',function(req,res)
{
	console.log("body");
	console.log(req.body);
	db.func('sp_sendOrder',[req.body.orderID,req.body.deliveryDate])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:data[0].sp_sendorder} ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false}))
		})

});


app.post('/cancelOrder',function(req,res)
{
	db.func('sp_cancelOrder',[req.body.orderID,req.body.justification])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:data[0].sp_cancelorder} ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false}))})

});


/*******
FOR PRODUCTS MANAGEMENT (UPDATE AND GET)
********/

app.get('/getProductsByType',function(req,res)
{
	db.func('sp_getProductsByType',[req.query.productType,req.query.enterpriseID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});

app.post('/updateProductInformation',function(req,res)
{
	upload(req,res, function (err) {
        if (err) {
        	console.log(err);
            res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue exitoso"}));
        }
        else{

        	if (req.file) {
        		var coverImageData = req.file.buffer;

        		uploadImageToService(coverImageData,req.file.originalname, req.file.mimetype ,productsBucketName,function(error,imageUrl){
        			if (error===false){
        					//execute the store procedure

        					//1 is an enterprise
        					db.func('sp_updateProductInformation',[req.body.productID, req.body.name,req.body.price,req.body.unit,imageUrl,req.body.stock,req.body.description])
								.then(data => {
									console.log(data);
									res.end(JSON.stringify({response:data[0].sp_updateproductinformation} ) );
									})
		  						.catch(f_error=> {
								    console.log("ERROR: ",f_error);
								    res.end(JSON.stringify({ response:false}))})

        						}

        				else{
        					console.log(error);
        					res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue existoso"}));
        				}
        		});

        	
        	  }

			else{
				res.end(JSON.stringify({response:false,message: "El proceso de carga de la imagen no fue existoso"}));

			}
		}

    });
	

});

app.get('/getOrderProducts',function(req,res)
{
	db.func('sp_getOrderProducts',[req.query.orderID])
		.then(data => {
			console.log(data);
			res.end(JSON.stringify({response:true, "data": data } ) );
			})
		  .catch(error=> {
		    console.log("ERROR: ",error);
		    res.end(JSON.stringify({ response:false,"data":[]}));})

});



var server = app.listen(8081, function ()
{
	var host = server.address().address;
	var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
