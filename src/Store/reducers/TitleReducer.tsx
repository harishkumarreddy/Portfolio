import { ActionTypes } from "../constants/ActionTyps";

const initialState = (window.location.pathname.slice(1)).split("/")[0]

export const titleReducer = (state:any = initialState, {type, payload}:any)=>{
    // debugger
    switch (type) {
        case ActionTypes.SET_SCREEN_TITLE:
            return {...state, title:payload};
    
        default:
            return state;
    }
}