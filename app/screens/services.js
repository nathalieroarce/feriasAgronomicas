'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var ip  = '172.0.0.106';


var serverRequest = async (url, callback)=> {
  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    var data = responseJson.data;
    console.log(data);
    callback(data);
  })
  .catch((error) =>{
    console.log("No estas conectado")
  });
};






module.exports =
{
  getError: (callback) => {serverRequest('http://'+ip+':8081/Error', callback)},
  getEnterprises: (callback) => {serverRequest('http://'+ip+':8081/getEnterprises', callback)},
  getEnterpriseProducts: (enterpriseId, callback) =>  {serverRequest('http://'+ip+':8081/getEnterpriseProducts?enterpriseID='+enterpriseId, callback)},
  getProductsByKey:(key,enterpriseId, callback) => {serverRequest('http://'+ip+':8081/getProductsByKey?key='+key+'&enterpriseID='+enterpriseId, callback)},
}
