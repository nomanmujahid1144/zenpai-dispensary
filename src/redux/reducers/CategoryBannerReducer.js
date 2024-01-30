import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    banner: {},
};

const categoryBannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_SINGLE_BANNER_CATEGORIES: {
            return {
                ...state,
                banner: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default categoryBannerReducer;