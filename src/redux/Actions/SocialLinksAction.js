import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';

export const getSocialLinks = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/social/get-soical-links')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_SOCIAL_LINKS,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Link Found')
            dispatch({
                type: ACTION_TYPES.GET_SOCIAL_LINKS,
                payload: {}
            })
        }
    }
}

export const getSingleSocialLink= (id) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/social/get-social-link', {
            params: {
                id : id
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_SOCIAL_LINK,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Link Found')
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_SOCIAL_LINK,
                payload: {}
            })
        }
    }
}