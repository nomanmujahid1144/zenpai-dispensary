import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';

export const addSocialLinks = (formData, navigate, alert) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.post('/api/v1/social/add-social-link', formData)
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            alert.show('Social Link added successfully')
            dispatch({
                type: ACTION_TYPES.SET_SOCIAL_LINK,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('Error while adding Links')
        }
    }
}
// export const updateSocialLinks = (id , formData , navigate, alert) => {
//     return async (dispatch) => {
//         dispatch(selectProgressBarState(true))
//         // let obj = {};
//         // if (headerImage) {
//         //     obj = {
//         //         data: aboutData,
//         //         blogHeading: blogHeading,
//         //         blogImage: headerImage,
//         //     }   
//         // } else {
//         //     obj = {
//         //         data: aboutData,
//         //         blogHeading: blogHeading
//         //     }
//         // }
//         const res = await axiosInstance.post('/api/v1/blog/updateblog', formData ,  {
//             params: {
//                 values: JSON.stringify(values), 
//                 id: JSON.stringify(id)
//             },
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             }
//         })
//         if (res.data.success === true) {
//             dispatch(selectProgressBarState(false))
//             alert.show('Blog updated successfully', {
//                 onClose: () => {
//                     setIsOpen(false)
//                     navigate('/pages/blog')

//                 }
//             })
//             setTimeout(() => {
//                 setIsOpen(false)
//                 navigate('/pages/blog')

//             }, 5000)
//             dispatch({
//                 type: ACTION_TYPES.UPDATE_BLOG,
//                 payload: res.data.data
//             })
//         }
//         else {
//             dispatch(selectProgressBarState(false))
//             alert.show('error while updating blog')
//         }
//     }
// }
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
export const deleteSocialLink = (id, navigate, alert) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.delete('/api/v1/social/delete-social-link', {
            params: {
                id : id
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            alert.show('successfully Deleted Social Link');
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('Error in deletion')
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