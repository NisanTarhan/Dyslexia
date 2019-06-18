import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';


class Menu extends Component {

    logout = () => {
        firebase.auth().signOut();
        Actions.reset('login')
    }

    render() {
        return (
            <SafeAreaView style={styles.menu}>

                <TouchableOpacity style={styles.item}  onPress={() => Actions.home()} >
                   <Icon name="home" style={{color:'#009faf'}} />
                   <Text style={styles.sectionStyle}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => Actions.profile()}>
                    <Icon name="person" style={{color:'#009faf'}}/>
                    <Text style={styles.sectionStyle}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={this.logout}>
                    <Icon name="log-out" style={{color:'#009faf'}}/>
                    <Text style={styles.sectionStyle} >Logout</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    menu: {
        flex: 1,
    },
    sectionStyle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '600',
        alignItems:'center',
        color:'#009faf',
    },
    item: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        alignItems: 'center'
    }
})
export default Menu;