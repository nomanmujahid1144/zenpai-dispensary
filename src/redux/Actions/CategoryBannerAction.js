import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';


export const getSingleBanner = (categoryId) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/categoryBanner/getsinglebanner', {
            params: {
                categoryId: categoryId
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_BANNER_CATEGORIES,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Banner Found')
            dispatch({
                type: ACTION_TYPES.GET_BANNER_CATEGORIES,
                payload: []
            })
        }
    }
}