import { combineReducers } from "redux";
import {routReducer} from "./RoutReducer"
import { titleReducer } from "./TitleReducer";

const reducers = combineReducers({
    "urlParts": routReducer,
    "title": titleReducer
})

export default reducers