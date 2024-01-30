import productReducer from './ProductReducer'
import driversReducer from './DriversReducer'
import ProgressBarReducer from './ProgressBarReducer';
import ProfileReducer from './ProfileReducer';
import categoryReducer from './CategoryReducer';
import categoryBannerReducer from './CategoryBannerReducer';
import userReducer from './UserReducers';
import blogReducer from './BlogReducer';
import orderReducer from './OrderReducer';
import socialLinksReducer from './SocialLinkReducer';

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
    productReducer,
    driversReducer,
    ProgressBarReducer,
    ProfileReducer,
    categoryReducer,
    categoryBannerReducer,
    userReducer,
    blogReducer,
    orderReducer,
    socialLinksReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;