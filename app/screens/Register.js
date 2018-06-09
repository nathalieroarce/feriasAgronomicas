import React, {Component} from "react"
import {Text,View, Button,ImageBackground,TextInput,StyleSheet, Dimensions} from "react-native"
import { createStackNavigator } from 'react-navigation';
var styles = require('./styles');
var services = require('./services');
const backgroundImageDirection  =  'https://i.pinimg.com/originals/d4/c1/65/d4c1657eb6fd6cebb50cc659c06991ed.png';


class Register extends Component
{
    state =
    {
      userName : "",
      phone :"",
      email : "",
      password1:"",
      password2 :""
    }

    doRegister = () =>
    {

    }


    method = (data)=>
    {
      this.state.data = data;
      console.log(this.state.data);
    }

    render()
    {
        return(
            <ImageBackground style={styles.login} source={{uri:backgroundImageDirection}}>
                    <Text style={styles.text}>Nombre completo: </Text>
                    <TextInput onChangeText = {(text)=> {this.state.userName = text}} style={styles.largeInput}/>
                    <Text style={styles.text}>Numero de telefono: </Text>
                    <TextInput onChangeText = {(text)=> {this.state.phone = text}} style={styles.largeInput}/>
                    <Text style={styles.text}>Correo electronico: </Text>
                    <TextInput onChangeText = {(text)=> {this.state.email = text}} style={styles.largeInput}/>
                    <Text style={styles.text}>Contraseña: </Text>
                    <TextInput secureTextEntry={true} onChangeText = {(text)=> {this.state.password1 = text}} style={styles.largeInput}/>
                    <Text style={styles.text}>Verifique la Contraseña:</Text>
                    <TextInput secureTextEntry={true} onChangeText = {(text)=> {this.state.password2 = text}} style={styles.largeInput}/>                  
                    <Button  style={styles.button} title="Registrar" onPress={()=>services.getEnterprises(this.method)}/>
            </ImageBackground>
        );
    }
};
export default createStackNavigator({screen: Register},{mode:'modal',headerMode: 'none'});
