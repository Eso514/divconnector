import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import furniture from './furniture';

export default combineReducers({
    alert,
    auth,
    furniture
});