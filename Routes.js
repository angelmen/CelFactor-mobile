import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import LogIn from './pages/login';
import SignUp from './pages/signup';
import Navigation from './Navigation';

export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Stack key={"root"} hideNavBar>
                    <Scene key="LogIn" component={LogIn} title="LogIn" ></Scene>
                    <Scene key="SignUp" component={SignUp} title="SignUp" ></Scene>
                    <Scene key="Navigation" component={Navigation} title="Navigation" initial={true}></Scene>
                </Stack>
            </Router>
        )
    }
}