import React, {Component} from 'react'
import {SafeAreaView} from 'react-native'
import NavHeader from '../components/navHeader'

export default class Inventario extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <SafeAreaView>
                <NavHeader /> 
            </SafeAreaView>
        )
    }
}