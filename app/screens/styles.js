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
  },
  appContainer: {
    flex: 1,
    backgroundColor:'white',
  },
  image: {
    width: 70,
    height: 70,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#E6E6E6',
  },
  rowContent: {
    paddingLeft: 40,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
