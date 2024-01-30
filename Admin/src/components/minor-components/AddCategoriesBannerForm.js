import cannabisForm from '../../assets/cannabis-form.jpg'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'rsuite/dist/rsuite.min.css';
import ImageHolder from '../../assets/upload.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { baseURL } from '../../constants/baseURL';
import { getCategories } from '../../redux/Actions/CategoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { addBanner, getBanners, updateBanner } from '../../redux/Actions/CategoryBannerAction';
import { axiosInstance } from '../../constants/axiosInstance';




const categoryBannerSchema = Yup.object().shape({
    categoryBannerPhoto: Yup.string().required('Image is required'),
    categoryId: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export const AddCategoriesBannerForm = (props) => {
    console.log('these are props : ', props)
    const status = !props.isAdd ? props.isAdd : true

    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filePreview, setFilePreview] = useState(null)
    const [editItem, setEditItem] = useState([])
    const [categories, setCategories] = useState([])
    const [imgCheck, setImgCheck] = useState(false);

    const { banners } = useSelector(
        (state) => state.categoryBannerReducer
    );

    useEffect(() => {
        getCategory();
    }, []);

    useEffect(() => {
        if (!status) {
            setEditItem(banners.filter(
                (banner) => banner._id === global.editId
            ))
        }
    }, [!status]);


    const getCategory = async () => {
        try {
            await axiosInstance.get('/api/v1/category/getcategories')
                .then((response) => {
                    setCategories(response.data.data)
                }).catch((e) => {
                    alert.show('No Category Found')
                })
        }
        catch (e) {
            alert.show('No Category Found')
        }
    }

    return (
        <>
            <div className='w-full h-[85vh]'>
                {console.log("edit item : ", editItem)}
                <div style={{ scrollbarWidth: 'thin' }} className="container h-full mx-auto overflow-y-scroll">
                    <div className="flex justify-center">
                        <div className="w-full flex h-screen">
                            <div
                                className="w-2/3 h-auto  lg:block lg:w-5/12 bg-cover md:hidden "
                                style={{
                                    backgroundImage: `linear-gradient( to right, rgba(0,0,0,0.2) ,rgba(0, 0, 0, 0.2)) ,url(${cannabisForm})`, backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >

                            </div>

                            <div className="w-full xl:w-[65%] md:w-full bg-white rounded-lg ">
                                <h3 className="pt-4 text-2xl text-center mt-8 font-bold">{!status ? 'Banner Details' : "Add Banner"}</h3>
                                <Formik
                                    enableReinitialize
                                    initialValues={
                                        {
                                            categoryBannerPhoto: editItem.length !== 0 ? `${editItem[0].categoryBannerPhoto}` : '',
                                            categoryId: editItem.length !== 0 ? `${editItem[0].categoryId?._id}` : ''
                                        }
                                    }
                                    validationSchema={categoryBannerSchema}
                                    onSubmit={async (values) => {
                                        var formData = new FormData();
                                        if (!status) {
                                            if (imgCheck) {
                                                let image = values.categoryBannerPhoto
                                                formData.append('image', image)
                                                dispatch(updateBanner(values, formData, navigate, alert, props.modal))
                                            }
                                            else {
                                                dispatch(updateBanner(values, formData, navigate, alert, props.modal))
                                            }
                                        }
                                        else {
                                            let image = values.categoryBannerPhoto
                                            formData.append('image', image)
                                            dispatch(addBanner(values, formData, navigate, alert, props.modal))
                                        }
                                    }}
                                >
                                    {({ isSubmitting, values, setFieldValue, handleChange }) => (
                                        <Form className="px-8 pt-6 pb-8 mb-4 my-10 bg-white rounded">
                                            <div className="flex mx-auto justify-center">
                                                <div className=" md:mr-2 md:mb-0 md:w-full justify-center mx-auto">
                                                    <label htmlFor="upload" className='w-[120px] h-[120px] block rounded-[50%] cursor-pointer mx-auto mb-2'>
                                                        <img className='w-[125px] h-[125px] block rounded-[50%] cursor-pointer mb-2 ' src={!status && editItem.length !== 0 && !imgCheck ? baseURL + editItem[0].categoryBannerPhoto : !values.categoryBannerPhoto ? ImageHolder : filePreview} alt='img' />
                                                        <input className='hidden' id="upload" name="image" type="file" accept="image/*" onChange={(event) => {
                                                            setFieldValue("categoryBannerPhoto", event.currentTarget.files[0]);
                                                            setFilePreview(URL.createObjectURL(event.target.files[0]))
                                                            setImgCheck(true)
                                                        }} />
                                                    </label>

                                                    <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2 text-center " name='categoryBannerPhoto'>
                                                        Banner Image
                                                    </label>
                                                    <ErrorMessage className='text-red-600 text-xs text-center' name="categoryBannerPhoto" component="div" />
                                                </div>
                                            </div>
                                            <div className='flex justify-around '>

                                                <div className='flex flex-col my-5 mb-8'>
                                                    <div className='flex flex-col justify-around my-3'>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2  text-sm font-bold text-gray-700 md:mt-2" htmlFor="categoryId">
                                                                    Pick Category
                                                                </label>
                                                                <Field className='w-full px-3 py-2  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                                                    type="text"
                                                                    as="select"
                                                                    name="categoryId">
                                                                    <option value="" hidden selected>
                                                                    Select Category Here
                                                                    </option>
                                                                    {categories.map((catrgory, index) => (
                                                                    <option key={index} value={catrgory._id}>
                                                                        {catrgory?.brand}
                                                                    </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage className='text-red-600 text-xs font-thin' name="categoryId" component="div" />
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