import EstimatesActionTypes from './estimates.types';

const INITIAL_STATE = {
    estimates: null,
    errorMessage: undefined
}
const estimatesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EstimatesActionTypes.GET_ESTIMATES_SUCCESS:
            return {
                ...state,
                estimates: action.payload
            }
        case EstimatesActionTypes.GET_ESTIMATES_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case EstimatesActionTypes.CHECK_ESTIMATES:
            return {
                ...state,
                estimates: state.estimates 
            }
        default:
            return state
    }  
}

export default estimatesReducer;