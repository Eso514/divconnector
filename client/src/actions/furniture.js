import axios from 'axios';
import { setAlert } from './alert';
import { GET_FURNITURE, FURNITURE_ERROR, ADD_FURNITURE } from './types';

export const getFurnitures = () => async dispatch => {
    console.log('welcome');
    try{
        const furnitures = await axios.get('/api/furniture');
        dispatch({
            type: GET_FURNITURE,
            payload: furnitures.data
        });
    }catch(err){
        dispatch({
            type: FURNITURE_ERROR,
            payload: {msg: err.response.stateText, state: err.response.status}
        });
    }
}

export const searchFurnitures = Word => async dispatch => {
    console.log(Word);
    try{
        const furnitures = await axios.get(`/api/furniture/search/${Word}`);
        dispatch({
            type: GET_FURNITURE,
            payload: furnitures.data
        });
    }catch(err){
        dispatch({
            type: FURNITURE_ERROR,
            payload: {msg: err.response.stateText, state: err.response.status}
        });
    }
}

export const getFurnitureById = FurnitureId => async dispatch => {
    try{
        const furniture = await axios.get(`/api/furniture/${FurnitureId}`);
        dispatch({
            type: GET_FURNITURE,
            payload: furniture.data
        });
    }catch(err){
        dispatch({
            type: FURNITURE_ERROR,
            payload: {msg: err.response.stateText, state: err.response.status}
        });
    }
}

export const add = ({name, description, price}) => async dispatch => {
    
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify({name, description, price});
    
    try{
        const res = await axios.post('/api/furniture/', body, config);
        alert('done')
        dispatch({
            type: ADD_FURNITURE,
            payload: res.data
        });

    }catch(err){

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FURNITURE_ERROR
        });
    }
};
