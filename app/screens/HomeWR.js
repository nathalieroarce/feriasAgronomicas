import React, { Component } from 'react';
import {View, Modal ,Button,Text,StyleSheet,SectionList,TouchableHighlight,Image, FlatList} from 'react-native';
import { SearchBar, Header, Icon } from 'react-native-elements';
import {MaterialIcons} from 'react-native-vector-icons';
import { createStackNavigator } from 'react-navigation';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import NumericInput,{ calcSize } from 'react-native-numeric-input';


import Product from './components/Product';
import Enterprise from './components/Enterprise';
import EnterpriseProduct from './components/EnterpriseProduct';

var styles = require('./styles');
var services = require('./services');

export class HomeWR extends Component{
  state = {
    dataType : 'none',
    enterpriseId: '-1',
    soughtValue: 'none',
    data : []
  };

  handleSearch = () => {
    if(this.state.enterprisesId !== '-1'&& this.state.soughtValue === 'none')
    {
      services.getEnterpriseProducts(this.state.enterpriseId, (dt)=>{this.setState({data:dt,dataType:'enterpriseProducts'});});
    }
    else
    {
      services.getProductsByKey(this.state.soughtValue, '-1', (dt)=>{this.setState({data:dt, dataType:'products'});});
    }
  };

  handleChangeText= (input)=>{
    if(input.length <= 1)
    {
        services.getEnterprises((dt)=>{this.setState({data:dt,dataType:'enterprises'}); });
    }
    else{
      this.setState({soughtValue:input});
      this.handleSearch();
    }
  };

  componentDidMount= function()
  {
    services.getEnterprises((dt)=>{this.setState({data:dt, dataType:'enterprises'});});
  }

  render()
  {
    return (
      <View style={styles.appContainer}>
        <Header style=   {{backgroundColor:'#4B610B'}}
        centerComponent= {{ text: 'Ferias Agronomicas', style: { color: '#fff' } }}
        rightComponent=  {{ icon: 'input', color: '#fff',onPress:() => this.props.navigation.navigate("LoginScreen")}}/>

        <SearchBar lightTheme round searchIcon={{ size: 24 }} onChangeText={(text) => this.handleChangeText(text)} placeholder='Buscar...' />

        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            {
              if(this.state.dataType==="enterprises")
              {
                return(<Enterprise product={item}  method={() => {this.setState({enterpriseId:item.o_enterpriseid}); this.handleSearch();}}/>);
              }
              else if(this.state.dataType === "enterpriseProducts" && this.state.data != [])
              {
                return(<EnterpriseProduct product={item}   method={()=>{console.log("producto");}}/>);
              }
              else if (this.state.dataType === "products" && this.state.data != [])
              {
                return (<Product product={item}   method={()=>{console.log("producto");}}/>);
              }
            }
          }
        />
      </ View>);
  }
};


export default createStackNavigator({screen: HomeWR},{mode:'modal',headerMode: 'none'});
