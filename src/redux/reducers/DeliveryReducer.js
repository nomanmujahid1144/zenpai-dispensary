import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    headings: '',
    data: ''
};

const deliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_DELIVERY: {
            return {
                ...state,
                headings: action.payloadHeading,
                data: action.payloadData,
            };
        }
        default: {
            return state;
        }
    }
};
export default deliveryReducer;