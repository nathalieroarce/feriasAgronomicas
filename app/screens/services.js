'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var ip  = 'https://ferias-agronomicas.herokuapp.com';


var serverRequest = async (url, callback)=> {
  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    var data = responseJson.data;
    console.log(data);
    callback(data);
  })
  .catch((error) =>{
    alert("Error", "Error de conexion, verifica si los datos estan activos o que la red Wi-fi este abilidata.");
  });
};






module.exports =
{
  getEnterprises: (callback) => {serverRequest(ip+'/getEnterprises', callback)},
  getEnterpriseProducts: (enterpriseId, callback) =>  {serverRequest(ip+'/getEnterpriseProducts?enterpriseID='+enterpriseId, callback)},
  getProductsByKey:(key,enterpriseId, callback) => {serverRequest(ip+'/getProductsByKey?key='+key+'&enterpriseID='+enterpriseId, callback)},
  doLogin: (username, password, callback) => {serverRequest(ip+'/verifyUser?username='+username+'&password='+password, callback);},
  registerUser: (userData, callback)=> {serverRequest(ip+'/registerUser?name='+userData.name+'&phone='+userData.phone+'&email='+userData.email+'&password='+userData.password, callback)},
}

// doOrder() ..
