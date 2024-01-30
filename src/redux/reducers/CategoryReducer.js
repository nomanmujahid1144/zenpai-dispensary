import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    category: {},
    categories: []
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_CATEGORIES: {
            return {
                ...state,
                categories: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default categoryReducer;