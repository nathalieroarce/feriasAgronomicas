import React, {Component} from "react"
import {Text,View, Button,ImageBackground,TextInput,StyleSheet, Dimensions} from "react-native"
import { createStackNavigator } from 'react-navigation';
var styles = require('./styles');
const backgroundImageDirection  =  'https://i.pinimg.com/originals/d4/c1/65/d4c1657eb6fd6cebb50cc659c06991ed.png';

class Login extends Component
{
    state =
    {
        username:'',
        password:''
    }

    doLogin = () =>
    {
        console.log("Username"+this.username +"\nPassWord:"+this.password)

        // validate in data base,
        if(this.username== "julio" && this.password == 'kk')
        {
          this.props.navigation.navigate('HomeScreen');
        }
          this.props.navigation.navigate('HomeScreen');
    }

    render()
    {
        return(
            <ImageBackground style={styles.login} source={{uri:backgroundImageDirection}}>

                    <Text style={styles.text}> User </Text>
                    <TextInput onChangeText = {(text)=> {this.username = text}} style={styles.textInput}/>
                    <Text style={styles.text}> Password </Text>
                    <TextInput secureTextEntry={true} onChangeText = {(text)=> {this.password = text}} style={styles.textInput} />

                    <Button  style={styles.button} title="Login" onPress={this.doLogin}/>
            </ImageBackground>
        )
    }
};
export default createStackNavigator(
  {
    screen: Login
  },
  {
    mode:'modal',
    headerMode: 'none'
  }
);
