import  axiosInstance  from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';

const config = {
    headers: {
        "Authorization": localStorage.getItem('token')
    }
}

export const getSingleUserOrder = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        let page = 1;
        let limit = 5;
        const res = await axiosInstance.get('/api/v1/order/getallordersbyid' , {
            params: { page, limit }
          })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_USER_ORDER,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Order Found')
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_USER_ORDER,
                payload: []
            })
        }
    }
}

export const getOrderById = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        let page = 1;
        let limit = 5;
        const res = await axiosInstance.get('/api/v1/order/getallordersbyid' , {
            params: { page, limit }
          })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_USER_ORDER,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Order Found')
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_USER_ORDER,
                payload: []
            })
        }
    }
}


