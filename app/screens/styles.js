'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fAAAEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login:
  {
      flex:1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      padding:10,

  },
  textInput:
  {
      backgroundColor: 'white',
      width: 200,
      padding:10,
      fontSize: 16,
  },
  button:
  {
      backgroundColor: 'white',
      width: 200,
      padding:10,
      margin: 20,
  },
  text:
  {
      fontSize: 16,      
  }

});
