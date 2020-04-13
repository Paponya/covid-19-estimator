import EstimatesActionTypes from './estimates.types';


export const getEstimatesSuccess = (response) => ({
    type: EstimatesActionTypes.GET_ESTIMATES_SUCCESS,
    payload: response
});
export const getEstimatesFailure = (errorMessage) => ({
    types: EstimatesActionTypes.GET_ESTIMATES_FAILURE,
    payload: errorMessage
});

export const checkEstimates = () => ({
    types: EstimatesActionTypes.CHECK_ESTIMATES
});
