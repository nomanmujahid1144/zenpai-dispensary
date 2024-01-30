import React from 'react';
import cannabisForm from '../../assets/cannabis-form.jpg'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'rsuite/dist/rsuite.min.css';
import ImageHolder from '../../assets/upload.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { baseURL } from '../../constants/baseURL';
import { addCategory } from '../../redux/Actions/CategoryActions';
import { updateCategory } from '../../redux/Actions/CategoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { axiosInstance } from '../../constants/axiosInstance';




const SignupSchema = Yup.object().shape({
    categoryPhoto: Yup.string().required('Image is required'),
    brand: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    // .required('Required'),
    subCategory: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    // .required('Required'),
    type: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    // .required('Required'),
});

export const AddCategoriesForm = (props) => {
    console.log('these are props : ', props)
    const status = !props.isAdd ? props.isAdd : true
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filePreview, setFilePreview] = useState(null)
    const [editItem, setEditItem] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [brandType, setBrandType] = useState([])
    const [imgCheck, setImgCheck] = useState(false)
    const { categories } = useSelector(
        (state) => state.categoryReducer
    );
    useEffect(() => {
        if (!status) {
            setEditItem(categories.filter(
                (category) => category._id === global.editId
            ))
            getCategory(categories.filter(
                (category) => category._id === global.editId
            ))

        }
    }, [])

    function handleTags(event, type) {
        if (event.key !== 'Enter') return
        const value = event.target.value
        if (!value.trim()) return

        if (type === 'category') {
            setCategory([...category, value])
        }
        if (type === 'subCategory') {
            setSubCategory([...subCategory, value])
        }
        if (type === 'type') {
            setBrandType([...brandType, value])
        }
        event.target.value = ''
    }

    function removeTag(index, type) {
        if (type === 'category') {
            setCategory(category.filter((el, i) => i != index))
        }
        if (type === 'subCategory') {
            setSubCategory(subCategory.filter((el, i) => i != index))
        }
        if (type === 'type') {
            setBrandType(brandType.filter((el, i) => i != index))
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            return false;
        }
    }

    const getCategory = async (category) => {
        console.log(category[0].brand, "Category")
        try {
            const res = await axiosInstance.get('/api/v1/category/getsinglebrand', { params: { brand: category[0].brand } })
            console.log(res)
            if (res.data.success) {
                setCategory(res.data.data.category)
                setSubCategory(res.data.data.subCategory)
                setBrandType(res.data.data.type)
            }
            else {
                alert.show('No Category Found')
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            <div className='w-full h-[85vh]'>
                {console.log("edit item : ", editItem)}
                <div style={{ scrollbarWidth: 'thin' }} className="container h-full mx-auto overflow-y-scroll">
                    <div className="flex justify-center">
                        <div className="w-full flex ">
                            <div
                                className="w-2/3 h-auto  lg:block lg:w-5/12 bg-cover md:hidden "
                                style={{
                                    backgroundImage: `linear-gradient( to right, rgba(0,0,0,0.2) ,rgba(0, 0, 0, 0.2)) ,url(${cannabisForm})`, backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >

                            </div>

                            <div className="w-full xl:w-[65%] md:w-full bg-white rounded-lg ">
                                <h3 className="pt-4 text-2xl text-center mt-8 font-bold">{!status ? 'Category Details' : "Add Category"}</h3>
                                <Formik
                                    enableReinitialize
                                    initialValues={
                                        {
                                            categoryPhoto: editItem.length !== 0 ? `${editItem[0].categoryPhoto}` : '',
                                            brand: editItem.length !== 0 ? `${editItem[0].brand}` : '',
                                            category: editItem.length !== 0 ? `${editItem[0].category}` : '',
                                            subCategory: editItem.length !== 0 ? `${editItem[0].subCategory}` : '',
                                            type: editItem.length !== 0 ? `${editItem[0].type}` : '',
                                        }
                                    }
                                    validationSchema={SignupSchema}
                                    onSubmit={async (values) => {

                                        values.category = category;
                                        values.subCategory = subCategory;
                                        values.type = brandType;
                                        var formData = new FormData();
                                        if (!status) {
                                            if (imgCheck) {
                                                let image = values.categoryPhoto
                                                formData.append('image', image)
                                                dispatch(updateCategory(values, formData, navigate, alert, props.modal))
                                            }
                                            else {
                                                dispatch(updateCategory(values, formData, navigate, alert, props.modal))
                                            }
                                        }
                                        else {
                                            let image = values.categoryPhoto
                                            formData.append('image', image)
                                            dispatch(addCategory(values, formData, navigate, alert, props.modal))
                                        }
                                    }}
                                >
                                    {({ isSubmitting, values, setFieldValue, handleChange }) => (
                                        <Form className="px-8 pt-6 pb-8 mb-4 my-10 bg-white rounded" onKeyDown={(event) => handleKeyDown(event)} >
                                            <div className="flex mx-auto justify-center">
                                                <div className=" md:mr-2 md:mb-0 md:w-full justify-center mx-auto">
                                                    <label htmlFor="upload" className='w-[120px] h-[120px] block rounded-[50%] cursor-pointer mx-auto mb-2'>
                                                        <img className='w-[125px] h-[125px] block rounded-[50%] cursor-pointer mb-2 ' src={!status && editItem.length !== 0 && !imgCheck ? baseURL + editItem[0].categoryPhoto : !values.categoryPhoto ? ImageHolder : filePreview} alt='img' />
                                                        <input className='hidden' id="upload" name="image" type="file" accept="image/*" onChange={(event) => {
                                                            setFieldValue("categoryPhoto", event.currentTarget.files[0]);
                                                            setFilePreview(URL.createObjectURL(event.target.files[0]))
                                                            setImgCheck(true)
                                                        }} />
                                                    </label>

                                                    <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2 text-center " name='categoryPhoto'>
                                                        Category Image
                                                    </label>
                                                    <ErrorMessage className='text-red-600 text-xs text-center' name="categoryPhoto" component="div" />
                                                </div>
                                            </div>
                                            <div className='flex justify-around '>

                                                <div className='flex flex-col my-5 mb-8'>
                                                    <div className='flex flex-col justify-around my-3'>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2  text-sm font-bold text-gray-700 md:mt-2" htmlFor="brand">
                                                                    Brand
                                                                </label>
                                                                <Field className='w-full px-3 py-2  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="brand" />
                                                                <ErrorMessage className='text-red-600 text-xs font-thin' name="brand" component="div" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-around flex-col '>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="category">
                                                                    Category
                                                                </label>
                                                                <input className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                                                    type="text"
                                                                    onKeyDown={(event) => handleTags(event, 'category')}
                                                                    name="category"
                                                                />

                                                                <div className='w-full mt-1 flex items-center flex-wrap gap-1'>
                                                                    {category.map((tag, index) => (
                                                                        <div key={index} className='bg-[#Dad8d8] inline-flex  p-2 rounded-full'>
                                                                            <div className='text-gray-700'>{tag}</div>
                                                                            <div onClick={() => removeTag(index, 'category')} className='bg-[#000] text-[#fff] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center ml-2 cursor-pointer'>&times;</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <ErrorMessage className='text-red-600 text-xs' name="category" component="div" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='flex flex-col justify-around my-2'>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="subCategory">
                                                                    Sub-Category
                                                                </label>
                                                                <input className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                                                    type="text"
                                                                    onKeyDown={(event) => handleTags(event, 'subCategory')}
                                                                    name="subCategory"
                                                                />
                                                                <div className='w-full mt-1 flex items-center flex-wrap gap-1'>
                                                                    {subCategory.map((tag, index) => (
                                                                        <div key={index} className='bg-[#Dad8d8] inline-flex  p-2 rounded-full'>
                                                                            <div className='text-gray-700'>{tag}</div>
                                                                            <div onClick={() => removeTag(index, 'subCategory')} className='bg-[#000] text-[#fff] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center ml-2 cursor-pointer'>&times;</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <ErrorMessage className='text-red-600 text-xs font-thin' name="subCategory" component="div" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col justify-around  my-2'>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm mt-2 font-bold text-gray-700 md:mt-2" htmlFor="type">
                                                                    Type
                                                                </label>
                                                                <input className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                                                    type="text"
                                                                    onKeyDown={(event) => handleTags(event, 'type')}
                                                                    name="type"
                                                                />
                                                                <div className='w-full mt-1 flex items-center flex-wrap gap-1'>
                                                                    {brandType.map((tag, index) => (
                                                                        <div key={index} className='bg-[#Dad8d8] inline-flex  p-2 rounded-full'>
                                                                            <div className='text-gray-700'>{tag}</div>
                                                                            <div onClick={() => removeTag(index, 'type')} className='bg-[#000] text-[#fff] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center ml-2 cursor-pointer'>&times;</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <ErrorMessage className='text-red-600 text-xs' name="type" component="div" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-6 flex items-center justify-center gap-2 sm:flex-col text-center">
                                                <button
                                                    className="w-36 px-4 py-2 font-semibold text-gray-600 bg-[#E9C95D] rounded hover:bg-[#E9D95D] focus:outline-none focus:shadow-outline"
                                                    type="submit" disabled={isSubmitting}
                                                >
                                                    {!status ? 'Update' : 'Submit'}
                                                </button>
                                                <button className={`w-36 px-4 py-2 font-semibold text-gray-600 bg-[#E9C95D] rounded hover:bg-[#E9D95D] focus:outline-none focus:shadow-outline ${!status ? 'hidden' : ''}`} type="reset">Reset</button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}