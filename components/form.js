import React, { Component, useRef, createRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Actions } from "react-native-router-flux";



export default class Form extends Component{
    constructor(props){
        super(props)
    }
    goHome(){
        Actions.Home();
    }

    auth() {
        return true
    }

    render(){
        if (this.props.type == 'LogIn'){
        return(
            <View style={styles.loginContainer}>
            <View style={styles.loginDataContainer}>
                <View style={styles.loginDataInput}>
                    <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Codigo de empresa </Text>
                    <TextInput style={styles.loginInput}></TextInput>
                    <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Usuario </Text>
                    <TextInput style={styles.loginInput}></TextInput>
                    <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Contraseña </Text>
                    <TextInput style={styles.loginInput} secureTextEntry></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButtonContainer} activeOpacity={0.8} ref={(input) => this.loginPass = input} onPress={()=>{this.props.onPress}}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Enviar</Text>
                </View>
            </TouchableOpacity>
        </View>
        )
        } else if (this.props.type == 'SignUp'){
            return(
                <View style={styles.loginContainer}>
                <View style={styles.loginDataContainer}>
                    <View style={styles.loginDataInput}>
                        <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Usuario </Text>
                            <TextInput style={styles.loginInput} onSubmitEditing={() => this.signUpEmail.focus()}></TextInput>
                        <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Correo </Text>
                            <TextInput style={styles.loginInput} ref={(input) => this.signUpEmail = input} onSubmitEditing={() => this.signUpPass.focus()}></TextInput>
                        <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Contraseña </Text>
                            <TextInput secureTextEntry style={styles.loginInput} ref={(input) => this.signUpPass = input} onSubmitEditing={() => this.signUpRepeatPass.focus()}></TextInput>
                        <Text style={{ fontFamily: 'century-gothic', color: "rgba(15, 0 , 255, 1)" }}>Repita su Contraseña </Text>
                            <TextInput secureTextEntry style={styles.loginInput} ref={(input) => this.signUpRepeatPass = input}></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginButtonContainer} activeOpacity={0.8} ref={(input) => this.loginPass = input} onPress={() => { if (this.auth()) { this.goHome } }}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Enviar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        top: -50,
        alignSelf: "center",
        width: "80%",
        maxWidth: 400,
        flexGrow: 1,
    },
    loginDataContainer: {
        backgroundColor: "rgba(255,255,255,1)",
        width: "100%",
        paddingVertical: 30,
        elevation: 20,
        borderRadius: 10,
        shadowOffset: {
            height: 5,
            width: 0
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.5,
        shadowRadius: 26,
        justifyContent: "center"
    },
    loginInput: {
        borderBottomWidth: 2,
        borderColor: "#ddd",
        color: "#666",
        marginBottom: 10,
        height: 35
    },
    loginDataInput: {
        width: "80%",
        maxWidth: 300,
        alignSelf: "center",
    },
    loginButtonContainer: {
        width: 200,
        height: 50,
        elevation: 100,
        alignSelf: "center",
        top: "-3%"
    },
    loginButton: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(74,144,226,1)",
        elevation: 45,
        borderRadius: 50,
        shadowOffset: {
            height: 5,
            width: 0
        },
        shadowColor: "rgba(74,144,226,1)",
        shadowOpacity: 0.8,
        shadowRadius: 15,
        justifyContent: "center"
    },
    loginButtonText: {
        color: "rgba(255,255,255,1)",
        fontSize: 35,
        fontFamily: "calibri-regular",
        lineHeight: 35,
        alignSelf: "center",
    },
})