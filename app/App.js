import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Settings from './screens/Settings';
import Home from './screens/Home';
import Login from './screens/Login';
import SearchResults from './screens/SearchResults';


import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator(
  {
    HomeScreen: Home,
    SettingsScreen: Settings,
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
        <RootStack style ={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});
