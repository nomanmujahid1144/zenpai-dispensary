import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../minor-components/Card'
import { baseURL } from '../../constants/baseURL';
import { HeroMapInput } from '../minor-components/HeroMapInput'
import { axiosInstance } from "../../constants/axiosInstance";
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Loader } from '../minor-components/Loader'
import { useAlert } from 'react-alert'
import { DashboardProducts } from '../minor-components/DashboardProducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BottomImage from '../../assets/second-hero-section.png'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../redux/Actions/BlogsActions';
import { SlickSliderForHeaderImages } from '../minor-components/SlickSlider';


export const HeroSection = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let token = localStorage.getItem('token');
    const [products, setProducts] = useState([]);
    const [location, setLocation] = useState(false);
    const [notLocated, setNotLocated] = useState(false);
    // const [editHeaderPreview, seteditHeaderFilePreview] = useState('')
    const [editSliderPreview, seteditSliderFilePreview] = useState('')
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const config = {
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    }
    const { blogs } = useSelector(
        (state) => state.blogReducer
    );

    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );


    useEffect(() => {
        dispatch(getBlogs());
        getUserInfo();
        fetchProducts();
        getHeaderImages();
    }, [])


    const getHeaderImages = async () => {
        await axiosInstance.get('/api/v1/headerimages/getHeaderImages')
            .then((res) => {
                console.log(res.data.data, 'Images Get')
                let images = res.data.data;
                if (images.length != 0) {
                    // seteditHeaderFilePreview(res.data.data[0].headerPhotos)
                    seteditSliderFilePreview(res.data.data[0].sliderPhoto)
                }

            })
            .catch((err) => {

            })
    }

    const fetchProducts = async () => {
        await axiosInstance.get("/api/v1/product/getproducts")
            .then((data) => {
                axiosInstance.get('/api/v1/category/getcategories')
                    .then((resp) => {
                        console.log(data)
                        const brandsArray = [];
                        resp.data.data.forEach((brand) => {
                            brandsArray.push(brand.brand)
                        })
                        setBrands(brandsArray)
                        setCategories(resp.data.data)
                        setProducts(data.data.data);
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch(() => {
                alert.show("Something Went Wrong.")
            })
    };

    const getUserInfo = async () => {
        await axiosInstance.get('/api/v1/user/getsingleuser', config)
            .then((res) => {
                if (res.data.data.formattedAddress !== '') {
                    setLocation(true);
                } else {
                    setLocation(false);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateUser = async (values) => {
        await axiosInstance.patch('/api/v1/user/updateuser', values, config)
            .then(async (res) => {
                if (res.data.success) {
                    let verifyLocation = {
                        formattedAddress: res.data.data.formattedAddress,
                        geometry: res.data.data.geometry
                    }
                    getAccessProducts(verifyLocation)
                }
                else {
                    console.log('No Brand Found')
                }
            })
            .catch((error) => {
                console.log(error, "Error in Fetching Brands")
            })
    }

    const getAccessProducts = async (verifyLocation) => {
        await axiosInstance.post('/api/v1/user/verifylocation', verifyLocation)
            .then((resp) => {
                if (resp.data.success) {
                    setLocation(true);
                    setNotLocated(false)
                }
                else {
                    console.log('No Brand Found')
                }
            })
            .catch((error) => {
                setLocation(false);
                setNotLocated(true)

            })
    }

    const getLocation = async (values) => {

        if (token) {
            updateUser(values)
        } else {
            getAccessProducts(values)
        }



    }

    const handleItem = async (item, action) => {
        const details = {
            productId: item.id,
            quantity: item.quantity,
        }
        let url = ''

        if (action === 'p') {
            url = '/api/v1/order/addtocart'
        } else if (action === 'm') {
            url = '/api/v1/order/decreasecartquantity'
        }

        axiosInstance.post(url, details, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        }).then((res) => {
            localStorage.setItem('totalCart', res.data.data.details.length)
            alert.show("Product Added to Cart")
        }).catch((err) => {
            alert.show("Cart Updated")

        })
    }

    return (
        <>
            {!loading ? (
                <>
                {/* <Navbar /> */}
                {/* <HeroMapInput headerImage={editHeaderPreview} located={notLocated} gromatryLocation={getLocation} isLocaed={location} /> */}
                
                {categories.length > 0 ?
                    <div className='w-[90vw] mx-auto my-10'>
                        <h1 className='text-primaryText font-bold text-2xl my-10'>
                            Browse Our Catalogues
                        </h1>
                        <DashboardProducts products={categories} istype='categories' />
                    </div>
                :null}
                <div className='w-[90vw] mx-auto my-10'>
                    <h1 className='text-primaryText font-bold text-2xl my-10'>
                        Best Sellers
                    </h1>
                    <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-2  gap-3'>
                        {products.map((item, index) => (
                            <div key={index} className='px-2 py-2'>
                                <Card
                                    svg={`${baseURL}${item.productPhoto}`}
                                    title={item.name}
                                    desc={item.description}
                                    price={item.price}
                                    item={item}
                                    value={index}
                                    getItem={handleItem}
                                />
                            </div>
                        ))
                        }
                    </div>
                </div>
                {blogs.length > 0 ?
                    <div className='w-[90vw] mx-auto my-20'>
                        <h2 className='text-primaryText font-bold text-2xl my-10'>
                            LATEST FROM THE BLOG
                        </h2>
                        <DashboardProducts blogs={blogs} isBlogType={true} />
                    </div>
                : null}
                <SlickSliderForHeaderImages>
                    <>
                        <div className='relative'>
                            <img
                                src={editSliderPreview != '' ? baseURL + editSliderPreview : BottomImage}
                                className='md:h-[600px] px-0'
                                style={{ width: '100%', height: 'auto' }}
                                alt='Your Image'
                            />
                            <div className='absolute opacity-[0.7] bg-slate-50 p-2 md:p-5 top-0 left-0 w-full h-full flex items-center'>
                                <div className='w-[90%] border-2 bg-slate-50 md:w-96 h-auto md:h-48 px-2 py-1 md:p-5 bg-bgGrayLight rounded-3xl flex flex-col justify-center text-start'>
                                <p className='text-lg md:text-2xl text-primaryColor font-bold mb-1 md:mb-4'>
                                    Find your strain
                                </p>
                                <p>
                                    With thousands to choose from, find the strain that fits your needs. Our products will make you feel Awesome.
                                </p>
                                </div>
                            </div>
                        </div>
                    </>
                    </SlickSliderForHeaderImages>
                {/* <div style={{ backgroundImage: `url(${editSliderPreview != '' ? baseURL + editSliderPreview : BottomImage})` }} className="w-[100%] h-[25vh] md:h-[70vh]  bg-no-repeat bg-bottom  bg-contain px-10 py-0  flex  items-center gap-4">
                    <div className='hidden lg:block'>
                        <div className='w-96 h-48  bg-slate-50 rounded flex flex-col justify-center text-center'>
                            <h1 className='text-2xl text-primaryText font-bold mb-4'>
                                Find your strain
                            </h1>
                            <p>
                                With thousands to choose from, find the strain that fits your needs.Our products will make you feel Awesome.
                            </p>
                        </div>
                    </div>
                </div> */}
                <>
                    <Footer />
                </>
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}
