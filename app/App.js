import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import ShoppingCart from './screens/ShoppingCart';
import Home from './screens/Home';
import Login from './screens/Login';


const RootStack = createStackNavigator(
  {
    HomeScreen: Home,
    ShoppingCartScreen: ShoppingCart ,
    //LoginScreen : Login
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  },
);

export default class App extends Component {
  render() {
    return (<RootStack style = {{flex: 1,backgroundColor: '#000'}}/>);
  };
};
