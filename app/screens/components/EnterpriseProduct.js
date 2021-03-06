import React, { Component } from 'react';
import {View, Image,TouchableOpacity, Text} from 'react-native';

var styles = require('./../styles');


class EnterpriseProduct  extends Component
{
  state =
  {
    item:   this.props.product,
    method: this.props.method,
  };


  render()
  {
    return(
      <TouchableOpacity style={styles.row} onPress={this.state.method}>
        <View style={styles.rowContainer}>
          <Image source={{ uri: this.state.item.o_image }} style={styles.image} />
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>{this.state.item.o_name}</Text>
            <Text> Precio:{this.state.item.o_price}/{this.state.item.o_unit} </Text>
          </View>
        </View>
      </TouchableOpacity>);
  };
}

export default EnterpriseProduct;
