import React, { Component } from 'react';
import {View, Image,TouchableOpacity, Text} from 'react-native';

var styles = require('./../styles');


class Enterprise extends Component
{
  state =
  {
    item:   this.props.product,
    method: this.props.method,
  };

  render()
  {
    return(
      <TouchableOpacity style={styles.row} onPress= {this.state.method} >
        <View style={styles.rowContainer}>
          <Image source={{ uri: this.state.item.o_logo }} style={styles.image} />
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>{this.state.item.o_name}</Text>
            <Text>{this.state.item.o_locationname} </Text>
          </View>
        </View>
      </TouchableOpacity>);
  };
}

export default Enterprise;
