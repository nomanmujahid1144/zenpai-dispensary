import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    blog: {},
    blogs: []
};

const BlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_BLOG: {
            return {
                ...state,
                blog: action.payload,
            };
        }
        case ACTION_TYPES.UPDATE_BLOG: {
            return {
                ...state,
                blog: action.payload,
            };
        }
        case ACTION_TYPES.GET_BLOGS: {
            return {
                ...state,
                blogs: action.payload,
            };
        }
        case ACTION_TYPES.GET_SINGLE_BLOG: {
            return {
                ...state,
                blog: action.payload,
            };
        }
        // case ACTION_TYPES.DELETE_BLOG: {
        //     return {
        //         ...state,
        //         blogs: state.blog.filter(
        //             (blog) => !action.payload.includes(blog._id)
        //         ),
        //     };
        // }
        default: {
            return state;
        }
    }
};
export default BlogReducer;