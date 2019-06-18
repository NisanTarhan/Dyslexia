import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native'

const {width} = Dimensions.get('window');

class Button extends Component {
   render() {   
       return (
           <TouchableOpacity
               onPress={this.props.handleButton}
               style={{width: width * 0.8,
                height: 40,
                backgroundColor: '#e0f7fa',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'}}
           >
               <Text style={{ color: '#009faf', fontSize: 16, fontWeight: 'bold'}}>{this.props.buttonName}</Text>
           </TouchableOpacity>
       )
   }
}

export default Button;