import React, { Component } from 'react';
import SearchResults from './modulos/SearchResults';
import {View ,StyleSheet } from 'react-native';
import { SearchBar, Header, Icon } from 'react-native-elements';
import {MaterialIcons} from 'react-native-vector-icons';

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  }
});

export default class App extends Component
{
  state = {
      requestType : 'enterprises',
      enterpriseID: '-1',
      soughtValue: 'none',
      data:[]
  }

    handleChangeText(input)
    {
        this.setState({soughtValue:input});
        console.log(this.state.soughtValue);
        this.handleSearch();
    }

    handleSearch = async () => {
        try
        {
            if(this.state.enterprisesID === -1 && this.state.soughtValue === 'none') {
                /*const response = await fetch('http://localhost:8081/getEnterprises')
                const data = await response.json();*/
                console.log(this.state.requestType);
                this.setState({enterpriseID:1});
            }
            else if(this.state.enterprisesID !== -1 && this.state.soughtValue === 'none'){
                /*const response = await fetch('http://localhost:8081//getEnterpriseProducts/'+this.state.enterprisesID)
                const data = await response.json();*/
                this.setState({requestType:'enterpriseProducts'});
                console.log(this.state.requestType);
            }
            else{
                /*const response = await fetch('http://localhost:8081//getProductsByKey/'+this.state.soughtValue+'/'+this.state.enterprisesID)
                const data = await response.json();*/
                console.log(this.state.requestType);
            }
        }
        catch (e)
        {
            console.log(e);
        }
    }

    //setInterval(() => {this.handleSearch()}, 4000);

    render()
      {
          const data = [
              {
                  o_image: 'http://www.vector-logo.net/logo_preview/ai/d/Del_Monte_logo.png',
                  o_enterprisename: 'Del Monte S. A.',
                  o_productname: 'Papas',
                  id: 0,
                  o_locationname : 'Santa clara, San Carlos, Alajuela, Costa Rica',
                  o_price: 100,
                  o_unit: 'Kgg',
              }];
        return (
          <View style={styles.appContainer}>
            <Header style={{backgroundColor:'#4B610B'}}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Ferias Agronomicas', style: { color: '#fff' } }}
                rightComponent={{ icon: 'shopping-cart', color: '#fff' }}
            />
            <SearchBar
                lightTheme
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => this.handleChangeText(text)}
                // onClear={someMethod}
                placeholder='Buscar...'
            />
            <SearchResults type = {this.state.requestType} data = {data} />
          </ View>
        )
      }
}
