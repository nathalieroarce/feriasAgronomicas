import React, {Component} from 'react';
import {View, Text,StyleSheet, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
var styles = require('./styles');

export class ShoppingCart extends Component {
  render()
  {
    return (
      <View style = {styles.container}>
        <Text> This is the Settings screen </Text>
        <Button onPress = {()=> this.props.navigation.navigate('HomeScreen')} title='Home' />
      </View>
    )
  }
};

export default createStackNavigator(
  {
    screen: Settings
  },
  {
    mode:'modal',
    headerMode: 'none'
  }
);
