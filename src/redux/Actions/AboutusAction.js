import  {axiosInstance}  from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';


export const getAboutUs = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/about/getaboutus')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            if (res.data.data.length !== 0) {
                dispatch({
                    type: ACTION_TYPES.GET_ABOUT_US,
                    payloadHeading : res.data.data[0].heading,
                    payloadData : res.data.data[0].data
                })
            }
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No About Us Found')
            dispatch({
                type: ACTION_TYPES.GET_ABOUT_US,
                payloadHeading : '',
                payloaDdata: ''
            })
        }
    }
}
