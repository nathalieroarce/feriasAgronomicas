import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import HomeWR from './screens/HomeWR';
import Login from './screens/Login';
import Register from './screens/Register';


const RootStack = createStackNavigator(
  {
    HomeScreen: Home,
    HomeWRScreen: HomeWR,
    RegisterScreen: Register,
    LoginScreen : Login
  },
  {
    initialRouteName: 'HomeWRScreen', // The fist view in the aplication.
    headerMode: 'none',
  },
);

export default class App extends Component {
  render() {
    return (<RootStack style = {{flex: 1,backgroundColor: '#000'}}/>);
  };
};
