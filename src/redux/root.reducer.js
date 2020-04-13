import { combineReducers } from 'redux';
import estimatesReducer from './estimates.reducer';
const rootReducer = combineReducers({
    estimates: estimatesReducer,
});

export default rootReducer;