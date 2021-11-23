import { ActionTypes } from "../constants/ActionTyps";

export const setRoutParts = ()=>{
    let url_parts = (window.location.pathname.slice(1)).split("/")
    console.log("url:", url_parts)
    return {
        type: ActionTypes.SET_ROUT_PARTS,
        payload: url_parts
    }
}