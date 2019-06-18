import {
    UPLOAD_START,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED
} from './types';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { uniqueIdGenerator } from '../helpers/UniqueIdGenerator';


export const uploadPhoto = (uri, firstName, surName, age, contentType = 'image/jpeg') => {
    return async dispatch => {
        try {
            dispatch({ type: UPLOAD_START });
            const userId = firebase.auth().currentUser.uid;
            const photoId = await uniqueIdGenerator();

            const snapshot = await firebase.storage().ref()
                .child(`/photos/${userId}`)
                .child(photoId)
                .put(uri, { contentType });

            await firebase.firestore()
                .collection('users').doc(userId)
                .collection('records').doc(photoId)
                .set({ url: snapshot.downloadURL, firstName, surName, age });

            dispatch({ type: UPLOAD_SUCCESS, payload: { url: snapshot.downloadURL, id: photoId } });
        }
        catch (error) {
            dispatch({ type: UPLOAD_FAILED });
            console.log(error.message);
        }
    }
}