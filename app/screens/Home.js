import React, { Component } from 'react';
import {View, Modal ,Button,Text,StyleSheet,TouchableHighlight,Image, FlatList} from 'react-native';
import { SearchBar, Header, Icon } from 'react-native-elements';
import {MaterialIcons} from 'react-native-vector-icons';
import { createStackNavigator } from 'react-navigation';
import Product from './components/Product';
import Enterprise from './components/Enterprise';
import EnterpriseProduct from './components/EnterpriseProduct';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import NumericInput,{ calcSize } from 'react-native-numeric-input';

var styles = require('./styles');
var services = require('./services');

var E_Product = class
{
  constructor(element, quantity)
  {
     this.o_id = element.o_id;
     this.o_enterpriseid = element.o_enterpriseid;
     this.o_name=element.o_name;
     this.o_price = element.o_price ;
     this.o_unit=element.o_unit;
     this.o_image=element.o_image;
     this.o_description=element.o_description;
     this.o_enterprisename= element.o_enterprisename;
     this.productQuantity= quantity;
  }
}


var CartEnterprise = class
{
  constructor(id, name, element)
  {
    this.id= id;
    this.name= name;
    this.data = [element];
  }

  get getProducts()
  {
    return this.data;
  }

  addproduct(newProduct, quantity)
  {
    var j;
    for(j=0; j<this.data.length; j++)
    {
      if(this.data[j].o_id== newProduct.o_id)
      {
        this.data[j].productQuantity += quantity;
        return;
      }
    }
    this.data.push(new E_Product(newProduct, quantity));
    return;
  }
}

var Cart = class
{
  constructor()
  {
    this.enterprises = [];
  }

  addTocart(newProduct, quantity)
  {
    var idEnterprise = newProduct.o_enterpriseid;
    var i;
    for(i=0; i<this.enterprises.length; i++)
    {
      if(this.enterprises[i].id== idEnterprise)
      {
        return this.enterprises[i].addproduct(newProduct, quantity);
      }
    }
    this.enterprises.push(new CartEnterprise(newProduct.o_enterpriseid, newProduct.o_enterprisename, new E_Product(newProduct, quantity)));
    return;
  }
}


export class Home extends Component
{
  state = {
    dataType : 'none',
    enterpriseId: '-1',
    soughtValue: 'none',
    data: [],
    cart: new Cart(),
    selectedProduct : { "o_id": -1, "o_enterpriseid": -1, "o_name": "None", "o_price": 0, "o_unit": "---", "o_image": "https://biotrendies.com/wp-content/uploads/2015/06/manzana.jpg", "o_description": "", "o_enterprisename": ""},
    productQuantity: 0,
    modalVisible: false
  };

  addTocart = ()=>
  {

  }




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
        <PopupDialog
        dialogTitle={ <Header centerComponent={{ text: '¿Añadir al carrito?', style: { color: '#fff' } }}  rightComponent={{ icon: 'close', color: '#fff',onPress:()=>{this.popupDialog.dismiss()}}} />}
        ref={(popupDialog) => { this.popupDialog = popupDialog; }} >


        <View style={styles.rowContainer}>
            <Image source={{ uri: this.state.selectedProduct.o_image }} style={styles.image2} />

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{this.state.selectedProduct.o_name}</Text>
              <Text>Empresa: {this.state.selectedProduct.o_enterprisename} </Text>
              <Text>Precio: {this.state.selectedProduct.o_price} / {this.state.selectedProduct.o_unit}  </Text>
              <Text>Descripción: {this.state.selectedProduct.o_description}  </Text>
              <Text>Selecciona la cantidad</Text>
              <NumericInput
              value={this.state.productQuantity} onChange={value => this.setState({productQuantity:value})} totalWidth={calcSize(240)}
              totalHeight={calcSize(50)} iconSize={calcSize(25)} step={1} valueType='real' rounded textColor='#B0228C'
              iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#EA3788' leftButtonBackgroundColor='#E56B70'/>

              <Button  style={styles.button} title="Añadir" onPress={()=>{this.state.cart.addTocart(this.state.selectedProduct,this.state.productQuantity);console.log(this.state.cart);  this.popupDialog.dismiss()}}/>
            </View>
          </View>
        </PopupDialog>

        <Header style={{backgroundColor:'#4B610B'}}
        leftComponent = {{ icon:'menu',color:'#fff', onPress:() => console.log('hello')}}
        centerComponent={{ text: 'Ferias Agronomicas', style: { color: '#fff' } }}
        rightComponent={{ icon: 'shopping-cart', color: '#fff',onPress:() => this.props.navigation.navigate("ShoppingCartScreen", {cart : this.state.cart})}}
        />

        <SearchBar lightTheme round searchIcon={{ size: 24 }} onChangeText={(text) => this.handleChangeText(text)} placeholder='Buscar...' />



        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            {
              if(this.state.dataType==="enterprises")
              {
                return(<Enterprise product={item}  method={() => {this.setState({enterpriseId:item.o_id}); this.handleSearch();}}/>);
              }
              else if(this.state.dataType === "enterpriseProducts" && this.state.data != [])
              {
                return(<EnterpriseProduct product={item}    method={()=>{this.setState({selectedProduct:item,productQuantity:1}); this.popupDialog.show();}}/>);
              }
              else if (this.state.dataType === "products" && this.state.data != [])
              {
                return (<Product product={item}   method={()=>{this.setState({selectedProduct:item,productQuantity:1}); this.popupDialog.show();}}/>);
              }
            }
          }
        />
      </ View>
)
  }
};

export default createStackNavigator(
  {
    screen: Home
  },
  {
    mode:'modal',
    headerMode: 'none'
  }
);
