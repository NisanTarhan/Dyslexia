import { combineReducers } from 'redux'
import AuthReducers from './AuthReducers'
import ImageReducers from './ImageReducers'

export default combineReducers({
    authResponse: AuthReducers,
    imageResponse: ImageReducers
})