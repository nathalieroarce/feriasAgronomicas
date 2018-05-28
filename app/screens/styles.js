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
      marginLeft:20,
      paddingLeft:20,
  },
  text:
  {
      fontSize: 16,
  },
  appContainer: {
    flex: 1,
    backgroundColor:'white',
  },
  image: {
    width: 70,
    height: 70,
  },
  image2: {
    width: 200,
    height: 200,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#E6E6E6',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    alignContent: 'center',
    justifyContent: 'space-evenly'
  },
  rowContent: {
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title:
  {
    fontWeight: 'bold',
    fontSize: 16,
  },
  ligthTitle:
  {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContent:
  {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
  }
});
