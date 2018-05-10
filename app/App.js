import React, { Component } from 'react'
import SearchResults from './modulos/SearchResults'
import {View ,StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  }
});

export default class App extends Component
{
  render()
  {
    return (
      <View style={styles.appContainer}>
      <SearchBar
        onChangeText={this.print}
        onClearText={this.print}
        placeholder="¿Que buscas?"
      />
      <SearchResults type = "enterprises" />
      </View>)
  }
}
