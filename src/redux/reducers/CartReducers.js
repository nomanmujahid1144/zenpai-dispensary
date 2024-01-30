import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    cartLength: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_CART_LENGTH: {
            return {
                ...state,
                cartLength : action.payloadLength,
            };
        }
        default: {
            return state;
        }
    }
};
export default cartReducer;