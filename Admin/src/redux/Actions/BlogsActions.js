import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';

export const addBlog = (values , formData , navigate, alert , isOpen , setIsOpen) => {

    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.post('/api/v1/blog/addblog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                values
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            setIsOpen(!isOpen)
            alert.show('Blog added successfully', {
                onClose: () => {
                    navigate('/pages/blog')
                }
            })
            setTimeout(() => {
                navigate('/pages/blog')
            }, 5000)
            dispatch({
                type: ACTION_TYPES.SET_BLOG,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('Error while adding Blog')
        }
    }
}


export const updateBlog = (id , values , formData , navigate, alert, isOpen, setIsOpen) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        // let obj = {};
        // if (headerImage) {
        //     obj = {
        //         data: aboutData,
        //         blogHeading: blogHeading,
        //         blogImage: headerImage,
        //     }   
        // } else {
        //     obj = {
        //         data: aboutData,
        //         blogHeading: blogHeading
        //     }
        // }
        const res = await axiosInstance.post('/api/v1/blog/updateblog', formData ,  {
            params: {
                values: JSON.stringify(values), 
                id: JSON.stringify(id)
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            alert.show('Blog updated successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/pages/blog')

                }
            })
            setTimeout(() => {
                setIsOpen(false)
                navigate('/pages/blog')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.UPDATE_BLOG,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('error while updating blog')
        }
    }
}

export const getBlogs = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/blog/getblogs')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_BLOGS,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Blog Found')
            dispatch({
                type: ACTION_TYPES.GET_BLOGS,
                payload: []
            })
        }
    }
}

export const deleteBlog = (id, navigate, alert , isOpen , setIsOpen) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.delete('/api/v1/blog/deleteblog', {
            params: {
                id : id
            }
        })
        console.log(res , 'res Delete blog')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            setIsOpen(!isOpen)
            alert.show('successfully Deleted Blog', {
                onClose: () => {
                    navigate('/pages/blog')
                }
            })
            setTimeout(() => {
                navigate('/pages/blog')
            }, 5000)
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('Error in deletion')
        }
    }
}

export const getBlogById= (id) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/blog/getblogbyid', {
            params: {
                id : id
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_BLOG,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Blog Found')
            dispatch({
                type: ACTION_TYPES.GET_SINGLE_BLOG,
                payload: []
            })
        }
    }
}