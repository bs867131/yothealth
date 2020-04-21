/**
 * Created by stan229 on 5/27/16.
 */
import { combineReducers } from 'redux';
import sales from "../redux/reducers";

const rootReducer = combineReducers({
    sales : sales
})

export default rootReducer;