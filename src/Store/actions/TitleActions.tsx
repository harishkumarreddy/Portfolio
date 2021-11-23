import { ActionTypes } from "../constants/ActionTyps";

export const setScreenTitle = (title:any)=>{
    // debugger
    return {
        type: ActionTypes.SET_SCREEN_TITLE,
        payload: title
    }
}