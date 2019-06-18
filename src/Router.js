import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import { Router, Scene, Stack, Drawer, Actions } from 'react-native-router-flux';
import { Login, Register, ForgotPassword } from './components/Onboarding';
import { Home, Profile, Result, Test, Menu } from './components/Pages';
import SplashScreen from 'react-native-splash-screen';
import { colors } from '../src/Style';

const drawerWidth = Dimensions.get('window').width * 0.7

const icon = () => {
    return <Icon name='menu' style={{ color: '#009faf' }} />
}

export default class componentName extends Component {

    componentDidMount(){
        SplashScreen.hide();
    }

    renderLeft() {
        return (
            <Icon name="arrow-round-back" style={{ marginLeft: 20 }} onPress={() => Actions.pop()} />
        )
    }

    render() {
        return (
            <Router
                navigationBarStyle={styles.navigationBarStyle}
                titleStyle={styles.navigationBarTitleStyle}
                sceneStyle={{ backgroundColor: 'white' }}>
                <Stack key='onboarding'>

                    <Scene
                        key='login'
                        hideNavBar
                        component={Login}
                    />

                    <Scene
                        key='register'
                        component={Register}
                        renderLeftButton={this.renderLeft}
                    />

                    <Scene
                        key='forgotPassword'
                        hideNavBar
                        component={ForgotPassword} />

                    <Drawer
                        hideNavBar
                        key="drawerMenu"
                        contentComponent={Menu}
                        drawerWidth={drawerWidth}
                        drawerPosition="left"
                        drawerIcon={icon}
                    >
                        <Scene
                            key='home'
                            title="Home"
                            component={Home}
                        />
                        <Scene
                            key='profile'
                            title="Profile"
                            component={Profile}
                             />
                    </Drawer>
                </Stack>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    navigationBarStyle: {
        backgroundColor: '#e0f7fa',
        borderBottomWidth: 0,
        elevation: 0
    },
    navigationBarTitleStyle: {
        color: '#009faf',
    },
})