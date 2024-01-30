import React from "react"
import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo } from "react"
import { axiosInstance } from "../../constants/axiosInstance"
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'
import { useSelector, useDispatch } from "react-redux"
import { Loader } from "../minor-components/Loader"
import { useAlert } from "react-alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { SlickSliderForHeaderImages } from "../minor-components/slider/SlickSlider"
import { baseURL } from "../../constants/baseURL"

export const AddHeaderImage = () => {

    const token = useSelector(
        (state) => state.ProfileReducer
    );
    const alert = useAlert()
    const dispatch = useDispatch()
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    const [moreExtras, setMoreExtras] = useState(1)
    const [fileHeaderPreview, setHeaderFilePreview] = useState(null)
    const [fileSliderPreview, setSliderFilePreview] = useState(null)
    const [editHeaderPreview, seteditHeaderFilePreview] = useState('')
    const [editSliderPreview, seteditSliderFilePreview] = useState('')
    const [headerImage, setHeaderFileImage] = useState(null)
    const [sliderImage, setSliderFileImage] = useState(null)
    const [imgHeaderCheck, setHeaderImgCheck] = useState(false)
    const [imgSliderCheck, setSliderImgCheck] = useState(false)
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    };

    useEffect(() => {
        getHeaderImages();
    }, []);

    const getHeaderImages = async () => {
        await axiosInstance.get('/api/v1/headerimages/getHeaderImages')
            .then((res) => {
                console.log(res.data.data, 'Images Get')
                let images = res.data.data;
                if (images.length != 0) {
                    seteditHeaderFilePreview(res.data.data[0].headerPhotos)
                    setMoreExtras(res.data.data[0].headerPhotos?.length)
                    seteditSliderFilePreview(res.data.data[0].sliderPhoto)
                } else {

                }

            })
            .catch((err) => {

            })
    }


    const submitBottomImage = async (e) => {
        dispatch(selectProgressBarState(true))
        e.preventDefault()
        var formData = new FormData();
        if (!sliderImage) {

        }

        if (sliderImage != null) {
            formData.append('sliderPhoto', sliderImage)
        }

        await axiosInstance.post("/api/v1/headerimages/addbottomImage", formData, config)
            .then(async (res) => {
                dispatch(selectProgressBarState(false))
                alert.show('Successfully updated Bottom Image')

            })
            .catch(() => {
                dispatch(selectProgressBarState(false))
                alert.show('Something Went Wrong')
            });
    }




    const [selectedImages, setSelectedImages] = useState(["", "" , ""]);
    const [headerImages, setHeaderImages] = useState([]);

    const handleImageChange = (event, index) => {
      const files = event.target.files;
      if (files && files[0]) {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = URL.createObjectURL(files[0]);
        
        const newHeaderImages = [...headerImages];
        newHeaderImages[index] = files[0];
        
        setSelectedImages(newSelectedImages);
        setHeaderImages(newHeaderImages);
      }
    };
  
    const handleImageSubmit = async (e) => {
        dispatch(selectProgressBarState(true))
        e.preventDefault();

        // Create a new FormData object
        const formData = new FormData();

        // Append each image to the formData object
        headerImages.forEach((image, index) => {
            formData.append(`headerimage${index + 1}`, image);
        });

        // Rest of your submission logic
        await axiosInstance.post("/api/v1/headerimages/addheaderImage", formData, config)
        .then(async (res) => {
            dispatch(selectProgressBarState(false))
            alert.show('Successfully updated Header Image')
        })
        .catch(() => {
            dispatch(selectProgressBarState(false))
            alert.show('Something Went Wrong')

        });
    };

    const handleCount = async (e) => {
        setMoreExtras(parseInt(moreExtras) + 1)
    };
    const decreaseCross = async (e) => {
        setMoreExtras(parseInt(moreExtras) - 1)
    };

    return (
        <>
            <div className="bg-gray-50   z-0">
                {!loading ? (
                    <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                        <div className='py-2 bg-gray-50'>
                            <div className=' bg-white rounded-lg  shadow-lg'>
                                <div className='px-5 pt-4 mb-4 flex justify-between'>
                                    <h2 className='font-semibold text-gray-800 text-lg'>Add Header Slider</h2>
                                    <Link to='/pages'>
                                        <button className='bg-myBg text-gray-600 px-4 py-2 rounded-full cursor-pointer hover:bg-[#E9D95D]'>
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="pr-2" />
                                            Back
                                        </button>
                                    </Link>

                                </div>
                                {/* <form onSubmit={handleSubmit}> */}
                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2 text-center " name='categoryPhoto'>
                                    Header Slider
                                </label>
                                <SlickSliderForHeaderImages>
                                    {Array.from({ length: moreExtras }).map((_, index) => (
                                        <div key={index} className="w-[100%] h-96 rounded-lg relative  bg-cover bg-fixed flex flex-col justify-center items-center" >
                                            {(index + 1) != 1 ?
                                                <span className='cursor-pointer absolute right-0 m-3 px-1 py-1 bg-white rounded-full' onClick={decreaseCross}>
                                                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                                </span>
                                                : null}
                                            <label className="w-[100%] h-96 cursor-pointer border-2 rounded-lg flex justify-center">
                                                {!selectedImages[index] && !editHeaderPreview[index] ? <h3 className="self-center">Click to Upload Header Slider Image {index + 1}</h3> :
                                                    <img src={editHeaderPreview.length > 0 ? baseURL + editHeaderPreview[index] : selectedImages[index]} className="w-[100%]" />}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className='hidden'
                                                    onChange={(event) => handleImageChange(event, index)}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </SlickSliderForHeaderImages>
                                <label className="block mb-2 mt-2 text-right text-sm font-bold text-myBg cursor-pointer md:mt-2" htmlFor="extras">
                                    <span onClick={handleCount}>+ Add More</span>
                                </label>
                                <div className="flex items-center justify-center pb-6 mt-16 px-4">
                                    <button onClick={handleImageSubmit} className='bg-myBg text-gray-600 px-4 py-2 rounded-full cursor-pointer hover:bg-[#E9D95D]'>
                                        {editHeaderPreview != '' ? 'Update header Image' : 'Add Header Image'}
                                    </button>
                                </div>
                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2 text-center " name='categoryPhoto'>
                                    Bottom Image
                                </label>
                                <div style={{ backgroundImage: `url(${fileSliderPreview ? fileSliderPreview : editSliderPreview ? editSliderPreview : null})` }} className="w-[100%] h-96 mb-3 rounded-lg   bg-cover bg-fixed flex flex-col justify-center items-center" >
                                    <label className="w-[100%] h-96 cursor-pointer border-2 rounded-lg flex justify-center">
                                        {!fileSliderPreview && (editSliderPreview == '') ? <h3 className="self-center">Click to Upload Bottom Image</h3> : null}
                                        <input className='hidden' id="upload" name="headerimage" type="file" accept="image/*"
                                            onChange={(event) => {
                                                setSliderFilePreview(URL.createObjectURL(event.target.files[0]))
                                                setSliderFileImage(event.target.files[0])
                                                setSliderImgCheck(true)
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="flex items-center justify-center py-6 px-4">
                                    <button onClick={submitBottomImage} className='bg-myBg text-gray-600 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9D95D]'>
                                        {editSliderPreview != '' ? 'Update Bottom Image' : 'Add Bottom Image'}
                                    </button>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}

            </div>
        </>
    )
}