import React, { useState, Component } from "react";
import { StyleSheet, Text, ScrollView, StatusBar, View, ImageBackground, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../components/logo';
import Form from '../components/form';
import { TextInput } from "react-native-paper";

const bcrypt = require('bcrypt')

export default class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            company_code: '',
            username: '',
            password: '',
            error: false
        }
        this.data = {
            works_for: '',
            username: '',
            password: '',
        }
    }

    authenticate(){
        const url = "https://celfactor-api.glitch.me/v2/auth/";
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data),
            })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.valid){
                        AsyncStorage.setItem('@userToken', 
                        JSON.stringify({token: bcrypt.hashSync((`${this.data.username}` + `${this.data.works_for}`), 10), age: Date.now()}))
                        console.log(JSON.parse(AsyncStorage.getItem('@userTocken')));
                        
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: "#FFF"}}>
                <Logo subHeader={"Login"}/>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{
                    flex: 1,
                    maxHeight: 400,
                    alignSelf: "center", 
                    padding: 20, 
                    marginTop: -30, 
                    width: "80%", 
                    maxWidth: 400, 
                    borderRadius: 10, 
                    shadowOffset: { width: 0, height: 10 },
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 10,
                    backgroundColor: "#FFF",
                    shadowRadius: 10}}>
                        <Text style={{ color: "#000455", fontSize: 17, paddingVertical: 10}}>Codigo de empresa</Text>
                        <TextInput  onChangeText={(val)=>{
                            this.setState({company_code: val}, () => {this.data.works_for = val * 1})
                    }} underlineColor={"#6561ed"}  keyboardType={'numeric'}></TextInput>
                        <Text style={{ color: "#000455", fontSize: 17, paddingVertical: 10 }}>Nombre de usuario</Text>
                    <TextInput autoCapitalize={false} onChangeText={(val) => {
                        this.setState({ username: val }, () => {this.data.username = val})
                    }} underlineColor={"#6561ed"}></TextInput>
                        <Text style={{ color: "#000455", fontSize: 17, paddingVertical: 10 }}>Contraseña</Text>
                    <TextInput  secureTextEntry onChangeText={(val) => {
                        this.setState({ password: val }, () => {this.data.password = val})
                    }} style={{marginBottom: 50}}underlineColor={"#6561ed"}></TextInput>
                </ScrollView>
                <TouchableOpacity style={{ 
                    alignSelf: "center",
                    padding: 20, 
                    width: 150, 
                    backgroundColor: "#6561ed", 
                    justifyContent: "center", 
                    alignItems:"center", 
                    borderRadius: 30, 
                    marginTop: -20,
                    shadowOffset: { width: 0, height: 10 },
                    shadowColor: "rgba(74,144,226,1)",
                    shadowOpacity: 0.3,
                    elevation: 10,
                    shadowRadius: 10,
                    marginVertical: 10
                    }} 
                    activeOpacity={0.8}
                    onPress={()=>{
                        console.log(this.data);
                        this.authenticate()
                        
                    }}
                    >
                        <View >
                            <Text style={{color: "#FFF", fontWeight: "bold", fontSize: 16}}>Enviar</Text>
                        </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexGrow: 1,
    },
    innerContainer: {
        flexGrow: 3,
    },
    backgroundHidden: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        //ImageBackground: require('../assets/images/Gradient_mmOEJc4.png')
    }
});


