import { ActionTypes } from "../constants/ActionTyps";

const initialState = {
    urlParts: (window.location.pathname.slice(1)).split("/")
}

export const routReducer = (state:any = initialState, {type, payload}:any)=>{
    switch (type) {
        case ActionTypes.SET_ROUT_PARTS:
            return {...state, urlParts:payload};
    
        default:
            return state;
    }
}