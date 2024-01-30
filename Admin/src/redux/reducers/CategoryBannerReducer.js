import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    banner: {},
    banners: []
};

const categoryBannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_BANNER_CATEGORY: {
            return {
                ...state,
                banner: action.payload,
            };
        }
        case ACTION_TYPES.UPDATE_BANNER_CATEGORY: {
            return {
                ...state,
                banner: action.payload,
            };
        }
        case ACTION_TYPES.GET_BANNER_CATEGORIES: {
            return {
                ...state,
                banners: action.payload,
            };
        }
        case ACTION_TYPES.DELETE_BANNER_CATEGORIES: {
            return {
                ...state,
                banners: state.banners.filter(
                    (banner) => !action.payload.includes(banner._id)
                ),
            };
        }
        default: {
            return state;
        }
    }
};
export default categoryBannerReducer;