import React, {Component} from 'react';
import {View,SectionList, Text,StyleSheet,FlatList,Image,Button} from 'react-native';
import { SearchBar, Header, Icon } from 'react-native-elements';
import {MaterialIcons} from 'react-native-vector-icons';
import { createStackNavigator } from 'react-navigation';
var styles = require('./styles');

export class ShoppingCart extends Component {
  state =
  {
    cart : this.props.navigation.state.params.cart
  }

  render()
  {
    return (
      <View style = {styles.appContainer}>
      <Header style={{backgroundColor:'#4B610B'}}
        leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:() => {this.props.navigation.navigate("HomeScreen")}}}
        centerComponent={{ text: 'Mi carrito', style:styles.title }}
      />

      <SectionList
        sections={this.state.cart.enterprises}
        renderItem={({item}) =>
          <View style={styles.row}>
            <Image source={{ uri: item.o_image }} style={styles.image} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{item.o_name}</Text>
              <Text>Precio: {item.o_price} / {item.o_unit}  </Text>
              <Text>Cantidad: {item.productQuantity}  </Text>
            </View>
          </View>}
          
        renderSectionHeader={({section}) => <Text style={styles.title}>{section.name}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    )
  }
};


export default createStackNavigator(
  {
    screen: ShoppingCart
  },
  {
    mode:'modal',
    headerMode:'none'
  }
);
