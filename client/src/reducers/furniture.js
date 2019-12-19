import { GET_FURNITURE, FURNITURE_ERROR, ADD_FURNITURE } from "../actions/types";


const initialState = {
    furniture: null,
    furnitures: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case ADD_FURNITURE:
        case GET_FURNITURE:
            return {
                ...state,
                furnitures: payload,
                loading: false
            };
        case FURNITURE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }
}