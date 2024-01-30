import  {axiosInstance}  from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';


export const getDelivery = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/delivery/getdelivery')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            if (res.data.data.length !== 0) {
                dispatch({
                    type: ACTION_TYPES.GET_DELIVERY,
                    payloadHeading : res.data.data[0]?.heading,
                    payloadData : res.data.data[0]?.data
                })
            }
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Delivery Found')
            dispatch({
                type: ACTION_TYPES.GET_DELIVERY,
                payloadHeading : '',
                payloaDdata: ''
            })
        }
    }
}
