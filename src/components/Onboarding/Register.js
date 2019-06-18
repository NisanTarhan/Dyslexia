import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item } from 'native-base';
import { colors } from '../../Style';
import logo from '../../img/logo.png'
import { connect } from 'react-redux';
import { register } from '../../actions';
import Button from '../global/Button'

const { width, height } = Dimensions.get('window');

class Register extends Component {

    state = {
        email: '',
        password: '',
        name: '',
    }

    render() {
        let { email, password, name } = this.state;
        return (
            <SafeAreaView style={styles.view_main}>
   
                <View style={styles.view_image}>
                    <Image style={styles.image} source={logo} />
                </View>

                <View style={styles.view_input}>
                    <TextInput value={name} onChangeText={(name) => this.setState({ name })} maxLength={30} placeholder='Name' style={styles.textInput}></TextInput>
                    <TextInput value={email} onChangeText={(email) => this.setState({ email })} maxLength={30} placeholder='Email' style={styles.textInput}></TextInput>
                    <TextInput value={password} onChangeText={(password) => this.setState({ password })} maxLength={30} placeholder='Password' style={styles.textInput} secureTextEntry></TextInput>
                </View>

                <Button handleButton={() => this.props.register(email.trim(), password, name.trim())} buttonName='Create Account' style={styles.button} />      

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    view_main: {
        flex: 1,
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view_image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height * 0.1
    },
    image: {
        marginTop: 80,
        height: 100,
        width: 200,
        marginBottom: 90
    },
    view_input: {
        paddingTop: 5,
        height: height * 0.25,
        justifyContent: 'center',
        marginBottom: 20
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 8,
        paddingRight: 7,
        height: 40,
        width: width * 0.7
    },
    button: {
        width: width * 0.8,
        justifyContent: 'center',
        borderRadius: 5
    },
})


const mapStateToProps = ({ authResponse }) => {
    return { loading: authResponse.loading };
}

export default connect(mapStateToProps, { register })(Register);