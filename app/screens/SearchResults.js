import React, { Component } from 'react';
import { ListView, View, Image, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
var styles = require('./styles');

const data = [
  {
    o_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgczAlJbEstRsc8i1avw9AbHP9CNJanGCSK1k5Vs8nZ-sjWJyY3g',
    o_enterprisename: 'El norte S.A.',
    o_productname: 'Papas',
    id: 0,
    o_locationname : 'Santa clara, San Carlos, Alajuela, Costa Rica',
    o_price: 100,
    o_unit: 'Kgg',
  }
];

const rowHasChanged = (r1, r2) => r1.id !== r2.id;
const ds = new ListView.DataSource({ rowHasChanged });

class SearchResults extends Component {
  print = () => {
    console.log('Hello world');
  };

  state = {
    dataSource: ds.cloneWithRows(this.props.navigation.state.params.type),
  };

  renderRow = rowData => {
    if(this.props.navigation.state.params.type == "enterpriseProducts")
    {
      return (
        <View style={styles.row}>
          <Image source={{ uri: rowData.o_image }} style={styles.image} />
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>{rowData.o_productname}</Text>
            <Text> Productor:{rowData.o_enterprisename}       </Text>
            <Text> Precio:{rowData.o_price}/{rowData.o_unit} </Text>
          </View>
        </View>
      );
    }
    else if (this.props.navigation.state.params.type == "enterprises" )
    {
      return (
        <View style={styles.row}>
          <Image source={{ uri: rowData.o_image }} style={styles.image} />
          <View style={styles.rowContent}>
          <Text style={styles.rowTitle}>{rowData.o_enterprisename}</Text>
            <Text>{rowData.o_locationname} </Text>
          </View>
        </View>
      );
    }
    else if (this.props.navigation.state.params.type == "enterpriseProducts" )
    {
      return (
        <View style={styles.row}>
          <Image source={{ uri: rowData.o_image }} style={styles.image} />
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>{rowData.o_productname}</Text>
            <Text>Empresa: {rowData.o_enterprisename} </Text>
            <Text>Precio: {rowData.o_price}  </Text>
          </View>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.appContainer}>
        <ListView
          style={styles.appContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}


export default createStackNavigator(
  {
    screen: SearchResults
  },
  {
    mode:'modal',
    headerMode: 'none'
  }
);
