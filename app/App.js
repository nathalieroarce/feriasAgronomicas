import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import Settings from './screens/ShoppingCart';
import Home from './screens/Home';
import Login from './screens/Login';
import SearchResults from './screens/SearchResults';


const RootStack = createStackNavigator(
  {
    HomeScreen: Home,
    ShoppingCartScreen: ShoppingCart ,
    LoginScreen : Login,
    SearchResultsScreen : SearchResults
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
  },
);

export default class App extends Component {
  render() {
    return (
        <RootStack style = {{flex: 1,backgroundColor: '#000'}}/>
    );
  };
};
