import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from './types'

export const login = (email, password) => {
    return (dispatch) => {
        if ((validateEmail(email)) || (email !== '' && password !== '')) {
            dispatch({ type: LOGIN_START });
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log("Başarılı: ", user);
                    const userId = user.user._user.uid;
                    
                    firebase.firestore().collection('users').doc(userId).get()
                        .then(userData => {
                            dispatch({ type: LOGIN_SUCCESS, payload: userData._data });
                            Actions.reset('drawerMenu');
                        }).catch(error => console.log("HATA: " + error))
                }).catch(error => {
                    console.log(error);
                    dispatch({ type: LOGIN_FAILED });
                })
        }
        else {
            Alert.alert('Lütfen geçerli bir email ve şifre giriniz!');
        }
    }
}

export const register = (email, password, name) => {
    return (dispatch) => {
        if (validate(email, password, age, name)) {
            dispatch({ type: REGISTER_START });
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log('Register Success:', user);
                    dispatch({ type: REGISTER_SUCCESS });
                    const id = user.user._user.uid;

                    firebase.firestore().collection('users').doc(id).set({ name, email, password })
                        .then(success => console.log("Kayıt başarılı: ", success))
                        .catch(error => console.log("Kayıt başarısız" + error));

                    Actions.login();

                }).catch(error => {
                    console.log('Register Hatalı:', error);
                    Alert.alert("Bu mail adresi zaten kullanılıyor.");
                    dispatch({ type: REGISTER_FAILED });
                });
        }
    }
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(String(password));
}

function validate(email, password, age, name) {
    switch (true) {
        case (password == '' || email == '' || name == '' || age == ''):
            Alert.alert("Lütfen bütün alanları doldurun!");
            return false;
        case (validateEmail(email) == false):
            Alert.alert("Lütfen geçerli bir email adresi giriniz.");
            return false;
        case (validatePassword(password) == false):
            Alert.alert("Şifre uzunluğu en az 6 karakter olmalı, \nharf ve rakam içermelidir!");
            return false;
        case ( isNaN(age) ):
            Alert.alert("Geçerli yaş değeri giriniz.");
            return false;
        case ( Number(age) < 4 || Number(age)> 12 ):
            Alert.alert("(4-12) yaş arası çocuklar kayıt olabilir.");
            return false;
        default:
            return true;
    }
}