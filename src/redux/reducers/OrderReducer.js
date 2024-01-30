import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    order: {},
    singleUserOrders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_SINGLE_USER_ORDER: {
            return {
                ...state,
                singleUserOrders: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default orderReducer;