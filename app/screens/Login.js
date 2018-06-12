import React, {Component} from "react"
import {Text,View, Button,ImageBackground,TextInput,StyleSheet, Dimensions} from "react-native"
import { createStackNavigator } from 'react-navigation';
var styles = require('./styles');
var services = require('./services');
const backgroundImageDirection  =  'https://i.pinimg.com/originals/d4/c1/65/d4c1657eb6fd6cebb50cc659c06991ed.png';
class Login extends Component
{
    state =
    {
        username:'',
        password:'',
        data : []
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

                    <Text style={styles.text}> User </Text>
                    <TextInput onChangeText = {(text)=> {this.username = text}} style={styles.textInput}/>
                    <Text style={styles.text}> Password </Text>
                    <TextInput secureTextEntry={true} onChangeText = {(text)=> {this.password = text}} style={styles.textInput} />
                    <View style={styles.buttonYcontainer}>
                      <Button  style={styles.button} title="Login" onPress={()=>services.getEnterprises(this.method)}/>
                      <Button  style={styles.button} title="Registrar" onPress={()=>this.props.navigation.navigate("RegisterScreen")}/>
                    </View>
            </ImageBackground>
        );
    }
};
export default createStackNavigator({screen: Login},{mode:'modal',headerMode: 'none'});
