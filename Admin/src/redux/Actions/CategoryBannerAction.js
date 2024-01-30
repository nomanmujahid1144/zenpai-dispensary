import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';

export const addBanner = (values, formData, navigate, alert, setIsOpen) => {

    return async (dispatch) => {

        console.log(formData , 'Form Data')
        console.log(values , 'Form values')
        const res = await axiosInstance.post('/api/v1/categoryBanner/addbanner', formData , {
            params: {
                values ,
            }
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if (res.data.success === true) {

            alert.show('Banner added successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/pages/category-banner')

                }
            })
            setTimeout(() => {
                setIsOpen(false)
                navigate('/pages/category-banner')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.SET_BANNER_CATEGORY,
                payload: res.data.data
            })
        }
        else {
            alert.show('error while adding category')
        }
    }
}


export const updateBanner = (values, formData, navigate, alert, setIsOpen) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.patch('/api/v1/categoryBanner/updatebanner', formData, {
            params: {
                values,
                id: global.editId
            }
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            alert.show('Banner updated successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/pages/category-banner')

                }
            })
            setTimeout(() => {
                setIsOpen(false)
                navigate('/pages/category-banner')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.UPDATE_BANNER_CATEGORY,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('error while updating banner')
        }
    }
}

export const getBanners = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/categoryBanner/getbanners')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_BANNER_CATEGORIES,
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

export const deleteBanner = (id, navigate, alert) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.delete('/api/v1/categoryBanner/deletebanner', {
            params: {
                IDS: id
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.DELETE_BANNER_CATEGORIES,
                payload: id
            })
            alert.show('deleted successfully', {
                onClose: () => {
                    navigate('/pages/category-banner')
                }
            })
            setTimeout(() => {
                navigate('/pages/category-banner')
            }, 5000)
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('Error in deletion')
        }
    }
}