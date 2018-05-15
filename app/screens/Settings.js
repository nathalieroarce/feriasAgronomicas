import React, {Component} from 'react';
import {View, Text,StyleSheet, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export class Settings extends Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B4C5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default createStackNavigator(
  {
    screen: Settings
  },
  {
    mode:'modal',
    headerMode: 'none'
  }
);
