import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    socialLink: {}
};

const SocialLinksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_SOCIAL_LINK: {
            return {
                ...state,
                socialLink: action.payload,
            };
        }
        case ACTION_TYPES.GET_SOCIAL_LINKS: {
            return {
                ...state,
                socialLink: action.payload,
            };
        }
        case ACTION_TYPES.GET_SINGLE_SOCIAL_LINK: {
            return {
                ...state,
                socialLink: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default SocialLinksReducer;